import { forwardRef, useState } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import Button from './utils/Button';

const RichTextEditor = ({ setArticleBody, articleBody }) => {
  const [contentPreview, setContentPreview] = useState('edit');

  return (
    <div className='rich-text-container'>
      {contentPreview === 'edit' ? (
        <MDEditor
          placeholder='Wrtie something ...'
          visibleDragbar={false}
          value={articleBody}
          onChange={setArticleBody}
          preview={contentPreview}
          height='100%'
          commands={[
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.code,
            commands.divider,
            commands.hr,
            commands.codeBlock,
            commands.image,
            commands.link,
            commands.divider,
            commands.checkedListCommand,
            commands.orderedListCommand,
            commands.unorderedListCommand,
            commands.divider,
            commands.title1,
            commands.title2,
            commands.title3,
          ]}
          extraCommands={[]}
        />
      ) : (
        <MDEditor.Markdown source={articleBody} />
      )}
      <div className='btns-container'>
        <Button
          onClick={() =>
            setContentPreview(contentPreview === 'edit' ? 'preview' : 'edit')
          }
          className='primary change-preview'
          width='fit-content'
        >
          change preview
        </Button>
      </div>
    </div>
  );
};

export default RichTextEditor;
