describe('review website', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('website opens with course list', () => {
    cy.get('h1').should('contain.text', 'Course reviews')
    cy.contains('CS-C3240 - Machine Learning D, Lecture')
    cy.contains('CS-C3120 - Human-Computer Interaction')
  })

  it('course with reviews clickable', () => {
    cy.contains('CS-C3240 - Machine Learning D, Lecture').click()
    cy.contains('Write a review')
    cy.contains('skip this course if u can')
  })

  it('course without reviews clickable', () => {
    cy.contains('CS-E4930 - Software Processes and Projects D').click()
    cy.contains('no reviews found')
    cy.contains('Write a review')
  })

  describe('creating new review', () => {
    it('stars and submission work', () => {
      cy.contains('CS-C3240 - Machine Learning D, Lecture').click()
      cy.contains('Write a review').click()
      cy.contains('Write a review')
      cy.get('.star1').eq(0).click()
      cy.get('.star1').eq(1).click()
      cy.get('.star5').eq(2).click()
      cy.get('.star1').eq(2).click()
      cy.get('textarea').click().type('meh')
      cy.contains('Post').click()
      cy.contains('2.7/5')
    })
  })
})