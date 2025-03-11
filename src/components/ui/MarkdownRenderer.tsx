import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => (
  <ReactMarkdown 
    className="prose prose-sm max-w-none text-gray-900"
    components={{
      p: ({ children }) => <p className="text-sm leading-relaxed">{children}</p>,
      ul: ({ children }) => <ul className="list-disc pl-4 space-y-1">{children}</ul>,
      li: ({ children }) => <li className="text-sm text-gray-700">{children}</li>,
    }}
  >
    {content}
  </ReactMarkdown>
);