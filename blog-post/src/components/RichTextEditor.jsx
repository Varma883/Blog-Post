import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Paragraph from "@tiptap/extension-paragraph"; // ✅ Added paragraph explicitly
import { FontSize } from "../extentions/FontSize"; // ✅ Make sure this exists correctly
import { MdFormatAlignLeft } from "react-icons/md";


const RichTextEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      FontSize,
      Color,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList.configure({ HTMLAttributes: { class: "list-disc pl-5" } }),
      OrderedList.configure({ HTMLAttributes: { class: "list-decimal pl-5" } }),
      Blockquote.configure({ HTMLAttributes: { class: "border-l-4 border-gray-300 pl-4 italic" } }),
      CodeBlock.configure({ HTMLAttributes: { class: "bg-gray-100 p-2 rounded font-mono" } }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "min-h-[5rem]",
        },
      }),
    ],
    content: content || '<p class="min-h-[5rem]"></p>',
    editorProps: {
      attributes: {
        class: "prose focus:outline-none min-h-[5rem] p-4 text-",
        placeholder: "Type here...",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && !editor.isDestroyed && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content]);

  if (!editor) return null;

  const toggleStyle = (command) => {
    editor.chain().focus()[command]().run();
  };

  return (
    <div className="border border-gray-300 rounded-xl bg-white shadow">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 bg-gray-50 rounded-t-xl">
        {/* Font Family */}
        <select
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="p-1 text-sm border rounded"
          value={editor.getAttributes("textStyle").fontFamily || ""}
        >
          <option value="">Font</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>

        {/* Font Size */}
        <select
          onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
          className="p-1 text-sm border rounded"
          value={editor.getAttributes("textStyle").fontSize || ""}
        >
          <option value="">Size</option>
          <option value="12px">Small</option>
          <option value="16px">Normal</option>
          <option value="20px">Large</option>
          <option value="24px">XL</option>
          <option value="32px">XXL</option>
        </select>

        {/* Formatting */}
        {[
          ["Bold", "bold", <strong>B</strong>],
          ["Italic", "italic", <em>I</em>],
          ["Underline", "underline", <u>U</u>],
          ["Strike", "strike", <s>S</s>],
        ].map(([title, cmd, icon]) => (
          <button
            key={cmd}
            onClick={() => toggleStyle(`toggle${cmd.charAt(0).toUpperCase() + cmd.slice(1)}`)}
            className={`p-1 px-2 rounded ${
              editor.isActive(cmd) ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            title={title}
          >
            {icon}
          </button>
        ))}

        {/* Text Color */}
        <input
          type="color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          value={editor.getAttributes("textStyle").color || "#000000"}
          className="w-8 h-8 border rounded cursor-pointer"
          title="Text Color"
        />

        {/* Text Align */}
        {["left", "center", "right"].map((align) => (
          <button
            key={align}
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
            className={`p-1 px-2 rounded ${
              editor.isActive({ textAlign: align }) ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            title={`Align ${align}`}
          >
            {align.charAt(0).toUpperCase()}
          </button>
        ))}

        {/* Headings */}
        {[1, 2, 3].map((lvl) => (
          <button
            key={lvl}
            onClick={() => editor.chain().focus().toggleHeading({ level: lvl }).run()}
            className={`p-1 px-2 rounded ${
              editor.isActive("heading", { level: lvl }) ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            title={`Heading ${lvl}`}
          >
            H{lvl}
          </button>
        ))}

        {/* Block Types */}
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-1 px-2 rounded ${editor.isActive("paragraph") ? "bg-gray-200" : "hover:bg-gray-100"}`}
          title="Paragraph"
        >
          P
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 px-2 rounded ${editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
          title="Bullet List"
        >
          •
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 px-2 rounded ${editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
          title="Ordered List"
        >
          1.
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1 px-2 rounded ${editor.isActive("blockquote") ? "bg-gray-200" : "hover:bg-gray-100"}`}
          title="Blockquote"
        >
          ❝
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-1 px-2 rounded ${editor.isActive("codeBlock") ? "bg-gray-200" : "hover:bg-gray-100"}`}
          title="Code Block"
        >
          {"</>"}
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1 px-2 rounded hover:bg-gray-100"
          title="Horizontal Rule"
        >
          ―
        </button>
        <button
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`p-1 px-2 rounded ${editor.isActive("link") ? "bg-gray-200" : "hover:bg-gray-100"}`}
          title="Insert Link"
        >
          🔗
        </button>
      </div>

      {/* Editor Area */}
      <div className="p-4 bg-white rounded-b-xl">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
