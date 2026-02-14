import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";

// Product-specific field configurations
const PRODUCT_FIELDS: Record<string, { label: string; fields: FieldConfig[] }> = {
	"topical-map": {
		label: "Topical Map",
		fields: [
			{ name: "targetKeywords", label: "Target Keywords", type: "tags", placeholder: "e.g., local SEO, plumber near me" },
			{ name: "competitors", label: "Competitor URLs", type: "tags", placeholder: "e.g., https://competitor.com" },
			{ name: "contentGoals", label: "Content Goals", type: "textarea", placeholder: "What do you want your content to achieve?" },
		],
	},
	"seo-audit": {
		label: "SEO Audit",
		fields: [
			{ name: "targetKeywords", label: "Target Keywords", type: "tags", placeholder: "Keywords you want to rank for" },
			{ name: "competitors", label: "Competitor URLs", type: "tags", placeholder: "Competitor websites" },
			{ name: "pagesToAudit", label: "Pages to Audit (URLs)", type: "tags", placeholder: "Specific URLs to focus on" },
			{ name: "knownIssues", label: "Known Issues", type: "textarea", placeholder: "Any known SEO issues?" },
		],
	},
	"gbp-optimization": {
		label: "GBP Optimization",
		fields: [
			{ name: "gbpUrl", label: "Google Business Profile URL", type: "text", placeholder: "https://google.com/maps/place/...", required: true },
			{ name: "businessHours", label: "Business Hours", type: "textarea", placeholder: "Mon-Fri 9am-5pm, Sat 10am-2pm" },
			{ name: "servicesCategories", label: "Services / Categories", type: "textarea", placeholder: "List your main services" },
		],
	},
	"content-pages": {
		label: "Content Pages",
		fields: [
			{ name: "targetKeywords", label: "Target Keywords (per page)", type: "tags", placeholder: "Keywords for each page" },
			{ name: "tone", label: "Content Tone", type: "select", options: ["Professional", "Conversational", "Authoritative", "Friendly"] },
			{ name: "topics", label: "Topics / Page Titles", type: "tags", placeholder: "Topics for each content page" },
		],
	},
	"citation-building": {
		label: "Citation Building",
		fields: [
			{ name: "businessNap", label: "Business Name (as listed)", type: "text", placeholder: "Exact business name", required: true },
			{ name: "address", label: "Full Address", type: "text", placeholder: "123 Main St, City, State ZIP", required: true },
			{ name: "phone", label: "Phone Number", type: "text", placeholder: "(555) 123-4567", required: true },
			{ name: "gbpUrl", label: "Google Business Profile URL", type: "text", placeholder: "https://google.com/maps/place/..." },
			{ name: "categories", label: "Business Categories", type: "tags", placeholder: "e.g., Plumber, HVAC, Electrician" },
		],
	},
	"schema-markup": {
		label: "Schema Markup",
		fields: [
			{ name: "pagesToMarkup", label: "Pages to Mark Up (URLs)", type: "tags", placeholder: "URLs to add schema to" },
			{ name: "businessType", label: "Business Type", type: "select", options: ["LocalBusiness", "ProfessionalService", "HomeAndConstructionBusiness", "HealthAndBeautyBusiness", "FoodEstablishment", "Store", "Other"] },
			{ name: "servicesList", label: "Services Offered", type: "tags", placeholder: "Your services" },
		],
	},
	"website-build": {
		label: "Website Build",
		fields: [
			{ name: "businessDescription", label: "Business Description", type: "textarea", placeholder: "Tell us about your business" },
			{ name: "designPreferences", label: "Design Preferences", type: "textarea", placeholder: "Colors, style, examples of sites you like" },
			{ name: "pagesNeeded", label: "Pages Needed", type: "tags", placeholder: "e.g., Home, About, Services, Contact" },
			{ name: "hasLogo", label: "Do you have a logo?", type: "select", options: ["Yes", "No, I need one", "No, use text only"] },
			{ name: "brandColors", label: "Brand Colors", type: "text", placeholder: "e.g., #0ea5e9, navy blue, white" },
		],
	},
};

interface FieldConfig {
	name: string;
	label: string;
	type: "text" | "textarea" | "tags" | "select";
	placeholder?: string;
	required?: boolean;
	options?: string[];
}

interface OrderData {
	orderId: string;
	productSlug: string;
	customerName: string;
	customerEmail: string;
	status: string;
}

export default function IntakeForm() {
	const { orderId } = useParams<{ orderId: string }>();
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token") || "";

	const [orderData, setOrderData] = useState<OrderData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	// Universal fields
	const [businessName, setBusinessName] = useState("");
	const [websiteUrl, setWebsiteUrl] = useState("");
	const [industry, setIndustry] = useState("");
	const [serviceArea, setServiceArea] = useState("");
	const [additionalNotes, setAdditionalNotes] = useState("");

	// Product-specific fields stored as key-value
	const [productSpecific, setProductSpecific] = useState<Record<string, any>>({});

	// Tag input state (for multi-value fields)
	const [tagInputs, setTagInputs] = useState<Record<string, string>>({});

	useEffect(() => {
		if (!token) {
			setError("Missing access token. Please use the link from your order confirmation email.");
			setLoading(false);
			return;
		}

		const convexUrl = import.meta.env.VITE_CONVEX_SITE_URL || import.meta.env.VITE_CONVEX_URL?.replace(".cloud", ".site");

		fetch(`${convexUrl}/orders/status?token=${encodeURIComponent(token)}`)
			.then((res) => {
				if (!res.ok) throw new Error("Invalid or expired access link");
				return res.json();
			})
			.then((data) => {
				if (data.status !== "pending_intake") {
					setError(
						data.status === "intake_submitted" || data.status === "queued" || data.status === "in_progress"
							? "Your intake form has already been submitted. Your order is being processed."
							: `This order is in status: ${data.status}`,
					);
				}
				setOrderData(data);
				setBusinessName(data.customerName || "");
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, [token]);

	const handleTagKeyDown = (fieldName: string, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			const value = tagInputs[fieldName]?.trim();
			if (value) {
				const current = productSpecific[fieldName] || [];
				setProductSpecific({ ...productSpecific, [fieldName]: [...current, value] });
				setTagInputs({ ...tagInputs, [fieldName]: "" });
			}
		}
	};

	const removeTag = (fieldName: string, index: number) => {
		const current = [...(productSpecific[fieldName] || [])];
		current.splice(index, 1);
		setProductSpecific({ ...productSpecific, [fieldName]: current });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!token || submitting) return;

		setSubmitting(true);
		try {
			// Separate universal keywords/competitors from product-specific
			const { targetKeywords, competitors, ...restSpecific } = productSpecific;

			const convexUrl = import.meta.env.VITE_CONVEX_SITE_URL || import.meta.env.VITE_CONVEX_URL?.replace(".cloud", ".site");

			const res = await fetch(`${convexUrl}/orders/intake`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					accessToken: token,
					intakeData: {
						businessName,
						websiteUrl: websiteUrl || undefined,
						industry: industry || undefined,
						serviceArea: serviceArea || undefined,
						competitors: competitors?.length ? competitors : undefined,
						targetKeywords: targetKeywords?.length ? targetKeywords : undefined,
						additionalNotes: additionalNotes || undefined,
						productSpecific: Object.keys(restSpecific).length > 0 ? restSpecific : undefined,
					},
				}),
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || "Submission failed");
			}

			setSubmitted(true);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-50">
				<div className="text-center">
					<div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
					<p className="mt-4 text-sm text-slate-500">Loading your order...</p>
				</div>
			</div>
		);
	}

	if (error && !orderData) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-50">
				<div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-sm">
					<h1 className="text-lg font-semibold text-red-600">Unable to Load Order</h1>
					<p className="mt-2 text-sm text-slate-600">{error}</p>
				</div>
			</div>
		);
	}

	if (submitted) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-50">
				<div className="mx-auto max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
						<svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
						</svg>
					</div>
					<h1 className="text-xl font-semibold text-slate-800">Intake Form Submitted</h1>
					<p className="mt-2 text-sm text-slate-600">
						Your order is now queued for production. We'll notify you at{" "}
						<strong>{orderData?.customerEmail}</strong> when your deliverable is ready.
					</p>
					<a
						href={`/dashboard/orders/${orderId}?token=${encodeURIComponent(token)}`}
						className="mt-6 inline-block rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
					>
						Track Your Order
					</a>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-50">
				<div className="mx-auto max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
					<h1 className="text-lg font-semibold text-slate-800">Order Status</h1>
					<p className="mt-2 text-sm text-slate-600">{error}</p>
				</div>
			</div>
		);
	}

	const productConfig = orderData ? PRODUCT_FIELDS[orderData.productSlug] : null;

	return (
		<div className="min-h-screen bg-slate-50 py-8">
			<div className="mx-auto max-w-2xl px-4">
				{/* Header */}
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-bold text-slate-800">
						Complete Your Intake Form
					</h1>
					<p className="mt-2 text-sm text-slate-500">
						{productConfig?.label || orderData?.productSlug} for{" "}
						<strong>{orderData?.customerName}</strong>
					</p>
					<p className="mt-1 text-xs text-slate-400">
						Order #{orderId}
					</p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Universal fields */}
					<div className="rounded-xl bg-white p-6 shadow-sm">
						<h2 className="mb-4 text-lg font-semibold text-slate-700">
							Business Information
						</h2>
						<div className="space-y-4">
							<Field
								label="Business Name"
								required
								value={businessName}
								onChange={setBusinessName}
								placeholder="Your business name"
							/>
							<Field
								label="Website URL"
								value={websiteUrl}
								onChange={setWebsiteUrl}
								placeholder="https://yourbusiness.com"
							/>
							<Field
								label="Industry"
								value={industry}
								onChange={setIndustry}
								placeholder="e.g., Plumbing, Dental, Legal"
							/>
							<Field
								label="Service Area"
								value={serviceArea}
								onChange={setServiceArea}
								placeholder="e.g., Dallas-Fort Worth metro area"
							/>
						</div>
					</div>

					{/* Product-specific fields */}
					{productConfig && (
						<div className="rounded-xl bg-white p-6 shadow-sm">
							<h2 className="mb-4 text-lg font-semibold text-slate-700">
								{productConfig.label} Details
							</h2>
							<div className="space-y-4">
								{productConfig.fields.map((field) => {
									if (field.type === "tags") {
										return (
											<div key={field.name}>
												<label className="mb-1.5 block text-sm font-medium text-slate-700">
													{field.label}
													{field.required && <span className="text-red-500"> *</span>}
												</label>
												<div className="flex flex-wrap gap-2 mb-2">
													{(productSpecific[field.name] || []).map((tag: string, i: number) => (
														<span
															key={i}
															className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
														>
															{tag}
															<button
																type="button"
																onClick={() => removeTag(field.name, i)}
																className="hover:text-emerald-900"
															>
																&times;
															</button>
														</span>
													))}
												</div>
												<input
													type="text"
													value={tagInputs[field.name] || ""}
													onChange={(e) => setTagInputs({ ...tagInputs, [field.name]: e.target.value })}
													onKeyDown={(e) => handleTagKeyDown(field.name, e)}
													placeholder={field.placeholder + " (press Enter to add)"}
													className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
												/>
											</div>
										);
									}
									if (field.type === "select") {
										return (
											<div key={field.name}>
												<label className="mb-1.5 block text-sm font-medium text-slate-700">
													{field.label}
												</label>
												<select
													value={productSpecific[field.name] || ""}
													onChange={(e) => setProductSpecific({ ...productSpecific, [field.name]: e.target.value })}
													className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
												>
													<option value="">Select...</option>
													{field.options?.map((opt) => (
														<option key={opt} value={opt}>{opt}</option>
													))}
												</select>
											</div>
										);
									}
									if (field.type === "textarea") {
										return (
											<div key={field.name}>
												<label className="mb-1.5 block text-sm font-medium text-slate-700">
													{field.label}
													{field.required && <span className="text-red-500"> *</span>}
												</label>
												<textarea
													value={productSpecific[field.name] || ""}
													onChange={(e) => setProductSpecific({ ...productSpecific, [field.name]: e.target.value })}
													placeholder={field.placeholder}
													rows={3}
													className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
												/>
											</div>
										);
									}
									return (
										<Field
											key={field.name}
											label={field.label}
											required={field.required}
											value={productSpecific[field.name] || ""}
											onChange={(val) => setProductSpecific({ ...productSpecific, [field.name]: val })}
											placeholder={field.placeholder}
										/>
									);
								})}
							</div>
						</div>
					)}

					{/* Additional notes */}
					<div className="rounded-xl bg-white p-6 shadow-sm">
						<label className="mb-1.5 block text-sm font-medium text-slate-700">
							Additional Notes
						</label>
						<textarea
							value={additionalNotes}
							onChange={(e) => setAdditionalNotes(e.target.value)}
							placeholder="Anything else we should know about your project?"
							rows={4}
							className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
						/>
					</div>

					{/* Submit */}
					<button
						type="submit"
						disabled={submitting || !businessName.trim()}
						className="w-full rounded-lg bg-emerald-500 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{submitting ? "Submitting..." : "Submit Intake Form"}
					</button>
				</form>
			</div>
		</div>
	);
}

// Simple text input field component
function Field({
	label,
	required,
	value,
	onChange,
	placeholder,
}: {
	label: string;
	required?: boolean;
	value: string;
	onChange: (val: string) => void;
	placeholder?: string;
}) {
	return (
		<div>
			<label className="mb-1.5 block text-sm font-medium text-slate-700">
				{label}
				{required && <span className="text-red-500"> *</span>}
			</label>
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				required={required}
				className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
			/>
		</div>
	);
}
