describe("Blog app", function () {
  const user = {
    username: "Flamingo",
    name: "Kalle",
    password: "pass123",
  }
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.request("POST", "http://localhost:3003/api/users", user)

    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("Login")
    cy.get("#loginField")
    cy.get("#passwordField")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#loginField").type("Flamingo")
      cy.get("#passwordField").type("pass123")
      cy.get("#loginButton").click()
      cy.contains("Logged in as Flamingo")
      cy.contains("Blogs")
    })

    it("fails with wrong credentials", function () {
      cy.get("#loginField").type("Flamingo")
      cy.get("#passwordField").type("asd")
      cy.get("#loginButton").click()
      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")

      cy.get("html").should("not.contain", "Logged in as Flamingo")
    })
  })

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", user).then(
        (res) => {
          localStorage.setItem("user", JSON.stringify(res.body))
          cy.visit("http://localhost:3000")
        }
      )
    })

    it("A Blog can be created", () => {
      cy.contains("new blog").click()
      cy.get("#titleField").type("Blog title")
      cy.get("#authorField").type("Blog author")
      cy.get("#urlField").type("BlogUrl")
      cy.contains("button", "create").click()
      cy.contains("Blog title")
    })

    describe("User note interactions", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Cypress blog",
          author: "Cypress",
          url: "test.com",
        })
      })

      it("Blog can be liked", function () {
        cy.contains("Cypress blog").click()
        cy.contains("0")
        cy.contains("like").click()
        cy.contains("1")
      })

      it("Blog can be deleted", function () {
        cy.contains("Cypress blog").click()
        cy.contains("button", "delete")
        cy.should("not.contain", "Cypress blog")
      })

      it("Blog can't be deleted by wrong user", function () {
        cy.createBlog({
          title: "Other blog",
          author: "Other",
          url: "wow.com",
          token: "abc",
        })
        cy.contains("Other blog")
        cy.contains("Other blog").click()
        cy.contains("delete").click()
        cy.contains("Other blog")
      })
    })

    describe.only("Other blog tests", function () {
      it("Blogs sorted in correct order", function () {
        cy.createBlog({
          title: "Second most liked blog",
          author: "Other",
          url: "wow.com",
        })
        cy.createBlog({
          title: "Most liked blog",
          author: "Other",
          url: "wow.com",
        })
        cy.createBlog({
          title: "Third most liked blog",
          author: "Other",
          url: "wow.com",
        })

        cy.contains("Third most liked blog").click()
        cy.contains("button", "like").click()
        cy.contains("Third most liked blog").click()

        cy.contains("Second most liked blog").click()
        cy.contains("button", "like").click().click()
        cy.contains("Second most liked blog").click()

        cy.contains("Most liked blog").click()
        cy.contains("button", "like").click().click().click()
        cy.contains("Most liked blog").click()

        cy.visit("http://localhost:3000")

        cy.get(".blog").eq(0).contains("Most liked blog")
        cy.get(".blog").eq(1).contains("Second most liked blog")
        cy.get(".blog").eq(2).contains("Third most liked blog")

      })
    })
  })
})
