import React from "react";
import ReactMarkdown from "react-markdown";
import {
  IconX,
  IconRocket,
  IconCalendar,
  IconUser,
  IconChecklist,
  IconExternalLink,
  IconCopy,
} from "@tabler/icons-react";

interface Brainstorm {
  _id: string;
  title: string;
  content: string;
  summary: string;
  sourceDate: string;
  sourceAgent: string;
  sourceVideo?: string;
  tags: string[];
  status: string;
  planGenerated: boolean;
  taskCount: number;
}

interface BrainstormDetailPanelProps {
  brainstorm: Brainstorm;
  onClose: () => void;
  onGeneratePlan: () => void;
}

export default function BrainstormDetailPanel({
  brainstorm,
  onClose,
  onGeneratePlan,
}: BrainstormDetailPanelProps) {
  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(brainstorm.content);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 w-full max-w-3xl bg-card border-l border-border z-50 flex flex-col shadow-xl">
      {/* Header */}
      <div className="shrink-0 border-b border-border px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-[var(--accent-orange)]/15 text-[var(--accent-orange)] uppercase">
              {brainstorm.status}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <IconCalendar size={12} />
              {brainstorm.sourceDate}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <IconUser size={12} />
              {brainstorm.sourceAgent}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <IconX size={18} />
          </button>
        </div>

        <h2 className="text-xl font-bold text-foreground leading-tight mb-3">
          {brainstorm.title}
        </h2>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {brainstorm.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 bg-muted rounded font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {!brainstorm.planGenerated ? (
            <button
              onClick={onGeneratePlan}
              className="flex items-center gap-2 text-sm font-semibold bg-[var(--accent-orange)] text-black px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <IconRocket size={16} />
              Generate Implementation Plan
            </button>
          ) : (
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent-green)] bg-[var(--accent-green)]/15 px-4 py-2 rounded-lg">
              <IconChecklist size={16} />
              Plan generated — {brainstorm.taskCount} tasks in queue
            </div>
          )}
          <button
            onClick={handleCopyContent}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-muted px-3 py-2 rounded-lg transition-colors"
          >
            <IconCopy size={14} />
            Copy
          </button>
          {brainstorm.sourceVideo && (
            <a
              href={brainstorm.sourceVideo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-muted px-3 py-2 rounded-lg transition-colors"
            >
              <IconExternalLink size={14} />
              Source
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="prose prose-sm dark:prose-invert max-w-none
          prose-headings:text-foreground
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-[var(--accent-blue)] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground
          prose-code:text-[var(--accent-orange)] prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-muted prose-pre:border prose-pre:border-border
          prose-li:text-muted-foreground
          prose-hr:border-border
          prose-blockquote:border-[var(--accent-blue)] prose-blockquote:text-muted-foreground
          prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3
        ">
          <ReactMarkdown>{brainstorm.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
