const newFormHandler = async (event) => {
    event.preventDefault();

    const book_title = document.querySelector('#book-title').value.trim();
    const description = document.querySelector('#book-desc').value.trim();

    if (book_title && description) {
        const response = await fetch(`/api/(GI), {
            method: 'POST',
            body: JSON.stringify({ name, book_title, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create profile');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete project');
        }
    }
};

document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);

