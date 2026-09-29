const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// =====================================================
// MEMBERSHIP API
// =====================================================

export const getMemberships = async () => {
  const response = await fetch(`${API_URL}/memberships`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch memberships"
    );
  }

  return data;
};

export const getMembershipById = async (id) => {
  const response = await fetch(
    `${API_URL}/memberships/${id}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch membership"
    );
  }

  return data;
};

export const updateMembershipStatus = async (
  id,
  status
) => {
  const response = await fetch(
    `${API_URL}/memberships/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update status"
    );
  }

  return data;
};

// =====================================================
// EVENTS API
// =====================================================

export const getEvents = async (queryParams = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${API_URL}/events${queryString ? `?${queryString}` : ""}`;
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch events");
  }

  return data;
};

export const getEventById = async (id) => {
  const response = await fetch(`${API_URL}/events/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch event details");
  }

  return data;
};

export const createEvent = async (eventData) => {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create event");
  }

  return data;
};

export const updateEvent = async (id, eventData) => {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update event");
  }

  return data;
};

export const deleteEvent = async (id) => {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete event");
  }

  return data;
};

// =====================================================
// BLOGS API
// =====================================================

export const getBlogs = async (queryParams = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${API_URL}/blogs${queryString ? `?${queryString}` : ""}`;
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch blogs");
  }

  return data;
};

export const getBlogById = async (id) => {
  const response = await fetch(`${API_URL}/blogs/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch blog details");
  }

  return data;
};

export const createBlog = async (blogData) => {
  const response = await fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create blog post");
  }

  return data;
};

export const updateBlog = async (id, blogData) => {
  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update blog post");
  }

  return data;
};

export const deleteBlog = async (id) => {
  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete blog post");
  }

  return data;
};