export default {
  get({ completed, created, updated, limit, page }) {
    let uri = '/api/tickets?';
    if (completed) {
      uri += `completed=${completed}&`;
    }

    if (created) {
      uri += `created=${created}&`;
    }

    if (updated) {
      uri += `updated=${updated}&`;
    }

    if (limit) {
      uri += `limit=${limit}&`;
    }

    if (page) {
      uri += `page=${page}&`;
    }

    return fetch(uri, { credentials: 'same-origin' })
      .then(response => response.json());
  },

  getById(id) {
    return fetch(`/api/tickets/${id}`, { credentials: 'same-origin' })
      .then(response => response.json());
  },

  close(id) {
    return fetch(`/api/tickets/${id}`, {
      credentials: 'same-origin',
      method: 'POST',
    })
      .then(response => response.json());
  },

  addComment(id, message) {
    return Promise.reject(new Error('not implemented'));
  },

  getAllComments(id) {
    return Promise.reject(new Error('not implemented'));
  },

  editComment(ticketId, commentId, message) {
    return Promise.reject(new Error('not implemented'));
  },

  deleteComment(ticketId, commentId) {
    return Promise.reject(new Error('not implemented'));
  },
};

