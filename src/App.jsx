import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, deleteNote, updateNote } from './features/notes/notesSlice';

function App() {
  const [note, setNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const notes = useSelector((state) => state.notes.items);
  const dispatch = useDispatch();

  const handleAddOrUpdateNote = () => {
    if (!note.trim()) return;

    if (editIndex !== null) {
      dispatch(updateNote({ index: editIndex, text: note }));
      setEditIndex(null);
    } else {
      dispatch(addNote(note));
    }
    setNote('');
  };

  const handleEdit = (index) => {
    setNote(notes[index]);
    setEditIndex(index);
  };

  return (
    <div style={{ maxWidth: 800, margin: '50px auto', textAlign: 'center' }}>
      <h1>📝 Not Defteri</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Not ekle veya düzenle..."
          style={{ padding: '8px', width: '60%' }}
        />
        <button
          onClick={handleAddOrUpdateNote}
          style={{ padding: '8px 12px', marginLeft: '8px' }}
        >
          {editIndex !== null ? 'Güncelle' : 'Ekle'}
        </button>
        {editIndex !== null && (
          <button
            onClick={() => {
              setEditIndex(null);
              setNote('');
            }}
            style={{ padding: '8px 12px', marginLeft: '8px' }}
          >
            İptal
          </button>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
        }}
      >
        {notes.map((n, index) => (
          <div
            key={index}
            style={{
              background: '#f0f0f0',
              padding: '16px',
              borderRadius: '8px',
              width: '200px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              position: 'relative',
            }}
          >
            {n}
            <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '8px' }}>
              <button
                onClick={() => dispatch(deleteNote(index))}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'red',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
                title="Sil"
              >
                ❌
              </button>
              <button
                onClick={() => handleEdit(index)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'blue',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
                title="Düzenle"
              >
                ✏️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
