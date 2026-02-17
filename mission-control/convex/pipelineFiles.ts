import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ═══════════════════════════════════════════════════════════════
// FILE STORAGE — Convex native file storage for deliverables
// ═══════════════════════════════════════════════════════════════

// Generate an upload URL for Archer to upload files to
export const generateUploadUrl = mutation({
	handler: async (ctx) => {
		return await ctx.storage.generateUploadUrl();
	},
});

// After upload, link the file to a deliverable
export const linkFileToDeliverable = mutation({
	args: {
		deliverableId: v.id("wooDeliverables"),
		storageId: v.id("_storage"),
		fileName: v.string(),
		fileType: v.string(),
		actor: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		// Get the URL for the stored file
		const fileUrl = await ctx.storage.getUrl(args.storageId);

		// Get file metadata
		const metadata = await ctx.storage.getMetadata(args.storageId);

		await ctx.db.patch(args.deliverableId, {
			fileStorageId: args.storageId,
			fileUrl: fileUrl ?? undefined,
			fileType: args.fileType,
			fileSizeBytes: metadata?.size,
		});

		// Log the upload
		await ctx.db.insert("pipelineDeliverableLog", {
			deliverableId: args.deliverableId,
			eventType: "file_uploaded",
			message: `File uploaded: ${args.fileName} (${args.fileType})`,
			actor: args.actor || "system",
			tenantId: "default",
		});

		return fileUrl;
	},
});

// Get a download URL for a deliverable's file
export const getFileUrl = query({
	args: { deliverableId: v.id("wooDeliverables") },
	handler: async (ctx, args) => {
		const deliverable = await ctx.db.get(args.deliverableId);
		if (!deliverable) return null;

		const storageId = deliverable.fileStorageId;
		if (!storageId) return deliverable.fileUrl || null;

		return await ctx.storage.getUrl(storageId);
	},
});
