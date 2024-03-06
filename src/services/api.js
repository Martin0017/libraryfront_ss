export const getData = async (url, token) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Error en la conexión');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener:', error);
      return null;
    }
  };

export const postData = async (url, data, token) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error en la conexión');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en el POST:', error);
      return null;
    }
  };

export const postDataWhitoutToken = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error en la conexión');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en el POST:', error);
      return null;
    }
  };
  

export const putData = async (url, data, token) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error en la conexión');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error al actualizar: ', error);
      return null;
    }
  };

export const deleteData = async (url, token) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Error en la conexión');
      }
      return 'Eliminado correctamente';
    } catch (error) {
      console.error('Error al borrar datos:', error);
      return null;
    }
  };
  