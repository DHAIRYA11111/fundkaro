"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Pin, CornerDownRight } from "lucide-react";
import { Comment } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CommentSectionProps {
  comments: Comment[];
  campaignCreatorId: string;
}

export default function CommentSection({ comments, campaignCreatorId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Filter top-level comments and handle sorting (pinned first, then newest)
  const topLevelComments = comments
    .filter(c => !c.parentId)
    .sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const getReplies = (parentId: string) => {
    return comments
      .filter(c => c.parentId === parentId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    // In a real app, this would make an API call
    console.log("Submit comment:", newComment, "replying to:", replyingTo);
    setNewComment("");
    setReplyingTo(null);
  };

  const CommentCard = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => {
    const isCreator = comment.user.id === campaignCreatorId;
    
    return (
      <div className={cn(
        "flex gap-4 p-4 rounded-xl",
        isReply ? "bg-slate-50 border border-slate-100" : "bg-white border border-slate-200",
        comment.isPinned && !isReply && "border-brand-200 bg-brand-50/30"
      )}>
        <Image
          src={comment.user.avatar}
          alt={comment.user.name}
          width={40}
          height={40}
          unoptimized
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div className="flex-grow min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold text-slate-900">{comment.user.name}</span>
            {isCreator && (
              <span className="bg-brand-100 text-brand-800 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                Creator
              </span>
            )}
            <span className="text-sm text-slate-500">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
            {comment.isPinned && (
              <span className="flex items-center gap-1 text-xs font-medium text-brand-600 ml-auto">
                <Pin className="w-3.5 h-3.5" />
                Pinned
              </span>
            )}
          </div>
          <p className="text-slate-700 whitespace-pre-wrap text-sm mb-2">{comment.content}</p>
          
          {!isReply && (
            <button 
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors"
            >
              Reply
            </button>
          )}

          {/* Reply Input Form */}
          {replyingTo === comment.id && !isReply && (
            <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
              <CornerDownRight className="w-5 h-5 text-slate-300 shrink-0 mt-2" />
              <div className="flex-grow">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={`Reply to ${comment.user.name}...`}
                  className="w-full rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 p-3 text-sm resize-none outline-none transition-all"
                  rows={2}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setReplyingTo(null)}
                    className="btn-brand-secondary text-xs px-3.5 py-1.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-brand-primary text-xs px-4 py-1.5 shadow-xs"
                  >
                    Post Reply
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Nested Replies */}
          {!isReply && getReplies(comment.id).length > 0 && (
            <div className="mt-4 space-y-4 pl-4 border-l-2 border-slate-100">
              {getReplies(comment.id).map(reply => (
                <CommentCard key={reply.id} comment={reply} isReply={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Level Input Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <label htmlFor="comment" className="block text-sm font-medium text-slate-700 mb-2">
          Leave a comment
        </label>
        <textarea
          id="comment"
          value={!replyingTo ? newComment : ""}
          onChange={(e) => !replyingTo && setNewComment(e.target.value)}
          onFocus={() => setReplyingTo(null)}
          placeholder="Ask a question or share your thoughts..."
          className="w-full rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 p-3.5 text-sm resize-none outline-none transition-all"
          rows={3}
        />
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="btn-brand-primary text-sm px-5 py-2.5 shadow-sm"
          >
            Post Comment
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {topLevelComments.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <h3 className="text-lg font-medium text-slate-900 mb-2">No comments yet</h3>
            <p className="text-slate-500">Be the first to share your thoughts on this campaign.</p>
          </div>
        ) : (
          topLevelComments.map(comment => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}
