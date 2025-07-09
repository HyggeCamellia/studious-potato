import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faClock, faPencil, faTrash, faEdit, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const NoteApp = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleCreateNote = () => {
    if (!title.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setContent('');
    setSelectedNoteId(newNote.id);
  };

  const handleUpdateNote = () => {
    if (!selectedNoteId || !title.trim()) return;

    setNotes(
      notes.map(note =>
        note.id === selectedNoteId
          ? {
              ...note,
              title,
              content,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );

    setTitle('');
    setContent('');
    setSelectedNoteId(null);
    setIsEditing(false);
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('确定要删除此笔记吗？')) {
      setNotes(notes.filter(note => note.id !== id));
      if (selectedNoteId === id) {
        setSelectedNoteId(null);
        setTitle('');
        setContent('');
        setIsEditing(false);
      }
    }
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  };

  const handleEditNote = () => {
    if (selectedNoteId) {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    if (selectedNoteId) {
      const note = notes.find(n => n.id === selectedNoteId);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }
    setIsEditing(false);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl mx-auto transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
      <div className="flex flex-col md:flex-row h-[90vh]">
        {/* 左侧笔记列表 */}
        <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索笔记..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="p-4">
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={() => {
                setSelectedNoteId(null);
                setTitle('');
                setContent('');
                setIsEditing(true);
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              <span className="font-medium">新建笔记</span>
            </button>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {filteredNotes.length === 0 ? (
              <div className="p-6 text-center text-gray-500 flex flex-col items-center justify-center h-full">
                <FontAwesomeIcon icon={fa-sticky-note-o} className="text-4xl mb-3 text-gray-400" />
                <p className="font-medium">暂无笔记，请创建新笔记</p>
              </div>
            ) : (
              filteredNotes.map(note => (
                <div
                  key={note.id}
                  className={`p-4 border-b border-gray-200 cursor-pointer ${
                    selectedNoteId === note.id 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500' 
                      : 'hover:bg-gray-100 hover:border-l-4 hover:border-gray-300'
                  } transition-all duration-200 flex flex-col`}
                  onClick={() => handleSelectNote(note)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800 truncate">{note.title}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{note.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* 右侧笔记详情 */}
        <div className="w-full md:w-2/3 flex flex-col">
          {selectedNoteId ? (
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
                        onClick={handleCancelEdit}
                      >
                        <FontAwesomeIcon icon={faTimes} className="mr-1" /> 取消
                      </button>
                      <button
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
                        onClick={handleUpdateNote}
                      >
                        <FontAwesomeIcon icon={faSave} className="mr-1" /> 保存
                      </button>
                    </>
                  ) : (
                    <button
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
                      onClick={handleEditNote}
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-1" /> 编辑
                    </button>
                  )}
                  <button
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
                    onClick={() => handleDeleteNote(selectedNoteId)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-1" /> 删除
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mb-6 pb-3 border-b border-gray-100">
                <span className="inline-flex items-center">
                  <FontAwesomeIcon icon={faClock} className="mr-1 text-gray-400" /> 
                  创建于 {new Date(notes.find(n => n.id === selectedNoteId)?.createdAt || '').toLocaleString()}
                </span>
                {notes.find(n => n.id === selectedNoteId)?.createdAt !== 
                 notes.find(n => n.id === selectedNoteId)?.updatedAt && (
                  <span className="ml-4 inline-flex items-center">
                    <FontAwesomeIcon icon={faPencil} className="mr-1 text-gray-400" /> 
                    最后更新于 {new Date(notes.find(n => n.id === selectedNoteId)?.updatedAt || '').toLocaleString()}
                  </span>
                )}
              </div>
              
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-all duration-200"
                    placeholder="输入标题..."
                  />
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full flex-1 min-h-[400px] text-gray-700 focus:outline-none p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-all duration-200 resize-none"
                    placeholder="输入内容..."
                  ></textarea>
                </>
              ) : (
                <div className="prose max-w-none text-gray-700 flex-1 overflow-y-auto p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-all duration-200">
                  <p>{content || '笔记内容将显示在这里...'}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <FontAwesomeIcon icon={fa-book} className="text-6xl text-gray-200 mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">选择一个笔记或创建新笔记</h3>
              <p className="text-gray-400 max-w-md">点击左侧的笔记查看详情，或者点击"新建笔记"开始记录你的想法</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteApp;