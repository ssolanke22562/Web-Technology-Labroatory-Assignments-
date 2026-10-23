import React from 'react';
import { MessageSquare, Hash } from 'lucide-react';

export default function PostCard({ post }) {
  return (
    <div className="card post-card">
      <div className="card-header">
        <div className="post-icon-wrapper">
          <MessageSquare size={18} />
        </div>
        <div className="post-meta">
          <span className="post-id-tag">
            <Hash size={12} /> Post {post.id}
          </span>
          <span className="post-user-tag">Author ID: {post.userId}</span>
        </div>
      </div>

      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>

      <div className="post-footer">
        <span className="badge badge-accent">JSONPlaceholder REST API</span>
      </div>
    </div>
  );
}
