export default {
  get({ completed, created, updated }) {
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

    return fetch(uri, { credentials: 'same-origin' })
      .then(response => response.json());
  },

  getTicketById(id) {
    return Promise.reject(new Error('not implemented'));
  },

  closeTicket(id) {
    return Promise.reject(new Error('not implemented'));
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

