Cypress.Commands.add("createBlog", ({ title, author, url, token = JSON.parse(localStorage.getItem("user")).token }) => {
  cy.request({
    url: "http://localhost:3000/api/blogs",
    method: "POST",
    body: {
      title: title,
      author: author,
      url: url,
    },
    headers: {
      Authorization: `bearer ${token}`,
    },
  })

  cy.visit("http://localhost:3000")
})
