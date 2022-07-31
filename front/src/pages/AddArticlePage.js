import { useState, useRef, useEffect } from 'react';
import { MegadraftEditor, editorStateFromRaw } from 'megadraft';
import { convertToHTML } from 'draft-convert';
import parse from 'html-react-parser';
import ArticleSetup from '../components/ArticleSetup';

const AddArticlePage = () => {
  const [editorState, setEditorState] = useState(() =>
    editorStateFromRaw(null)
  );
  const [doneWriting, setDoneWriting] = useState(false);
  const [data, setData] = useState('');

  const editor = useRef(null);

  useEffect(() => {
    editor.current.focus();
  }, []);

  return (
    <section className='container'>
      <div className='text-editor-container'>
        <MegadraftEditor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          placeholder='Add some text'
        />
      </div>
      <button
        onClick={() => {
          setDoneWriting(!doneWriting);
          const html = convertToHTML(editorState.getCurrentContent());
          setData(html);
        }}
      >
        Finish
      </button>
      <ArticleSetup doneWriting={doneWriting} setDoneWriting={setDoneWriting} />
    </section>
  );
};

export default AddArticlePage;
