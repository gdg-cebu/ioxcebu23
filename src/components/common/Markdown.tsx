import MarkdownToJsx from 'markdown-to-jsx';
import styles from './Markdown.module.css';

import type * as React from 'react';
import type * as types from 'types';

export type Props = { content: string; className?: string } & types.StackbitAnnotation;

const Markdown: React.FC<Props> = ({ content, className, sb }) => {
  return (
    <div className={[styles.markdown, className].join(' ')} data-sb-field-path={sb}>
      <MarkdownToJsx options={{ forceWrapper: true }}>{content}</MarkdownToJsx>
    </div>
  );
};

export default Markdown;
