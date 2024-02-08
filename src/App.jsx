import "./App.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudExample = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editedItem, setEditedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tarefa');
      setData(response.data);
    } catch (error) {
      console.error('Erro ao obter dados:', error);
    }
  };

  const handleCreate = async () => {
    if (newItem.trim() === '') {
      alert('Por favor, insira uma descrição válida para a tarefa.');
      return;
    }
    
    try {
      await axios.post('http://localhost:3000/tarefa', { description: newItem });
      fetchData();
      setNewItem('');
      alert('Item criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar item:', error);
      alert('Erro ao criar o item.');
    }
  };

  const handleEdit = async (id, newText) => {
    try {
      await axios.put(`http://localhost:3000/tarefa/${id}`, { description: newText });
      fetchData();
      setEditedItem(null);
      alert('Item editado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar item:', error);
      alert('Erro ao editar o item.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tarefa/${id}`);
      fetchData();
      alert('Item excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      alert('Erro ao excluir o item.');
    }
  };

  return (
    <div>
      <center>
        <h1>Lista de tarefas</h1>

        <div>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <br />
          <button onClick={() => { handleCreate(); }}>Adicionar</button>
        </div>

        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {editedItem === item.id ? (
                <>
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                  />
                  <button onClick={() => { handleEdit(item.id, newItem); }}>Salvar</button>
                </>
              ) : (
                <>
                  {item.description}
                  <button className="edit" onClick={() => { setEditedItem(item.id); }}>Editar</button>
                  <button className="delete" onClick={() => { handleDelete(item.id); }}>Excluir</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </center>
    </div>
  );
};

export default CrudExample;
