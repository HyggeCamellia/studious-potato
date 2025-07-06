"use client"
import React, { useState, useEffect } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Note = () => {
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-6xl mx-auto transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col md:flex-row">
        {/* 左侧笔记列表 */}
        <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索笔记..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          
          <div className="p-4">
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              onClick={() => {
                setSelectedNoteId(null);
                setTitle('');
                setContent('');
                setIsEditing(true);
              }}
            >
              <i className="fa fa-plus mr-2"></i> 新建笔记
            </button>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {filteredNotes.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <i className="fa fa-sticky-note-o text-4xl mb-3 block"></i>
                <p>暂无笔记，请创建新笔记</p>
              </div>
            ) : (
              filteredNotes.map(note => (
                <div
                  key={note.id}
                  className={`p-4 border-b border-gray-200 cursor-pointer ${
                    selectedNoteId === note.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-100'
                  } transition-colors duration-150`}
                  onClick={() => handleSelectNote(note)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800 truncate">{note.title}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{note.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* 右侧笔记详情 */}
        <div className="w-full md:w-2/3">
          {selectedNoteId ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition-colors duration-200"
                        onClick={handleCancelEdit}
                      >
                        取消
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors duration-200"
                        onClick={handleUpdateNote}
                      >
                        保存
                      </button>
                    </>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors duration-200"
                      onClick={handleEditNote}
                    >
                      编辑
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors duration-200"
                    onClick={() => handleDeleteNote(selectedNoteId)}
                  >
                    删除
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                <i className="fa fa-clock-o mr-1"></i> 
                创建于 {new Date(notes.find(n => n.id === selectedNoteId)?.createdAt || '').toLocaleString()}
                {notes.find(n => n.id === selectedNoteId)?.createdAt !== 
                 notes.find(n => n.id === selectedNoteId)?.updatedAt && (
                  <span className="ml-4">
                    <i className="fa fa-pencil mr-1"></i> 
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
                    className="w-full text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[400px] text-gray-700 focus:outline-none"
                  ></textarea>
                </>
              ) : (
                <div className="prose max-w-none text-gray-700">
                  <p>{content}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <i className="fa fa-book text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-medium text-gray-500 mb-2">选择一个笔记或创建新笔记</h3>
              <p className="text-gray-400 max-w-md">点击左侧的笔记查看详情，或者点击"新建笔记"开始记录你的想法</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;