import React from 'react'
import { Card, Image, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../assets/styles/RecipeCard.css'

function RecipeCardSmall({title, image, rating, noOfRating, id}: any) {
  return (
    <Link to={`/recipe/${id}`} className="m-0 p-0">
      <Card key={id} className='p-4 w-100 small-card d-flex mb-4 align-items-start rounded-4' style={{minWidth: `300px`}}>
        <Row className='gap-1 m-0 p-0'>
          <Col className='p-0 m-0'>
            <Image src={image} alt="Dish Image" className='rounded-4' style={{height: `120px`, width: `120px`}}/>
          </Col>
          <Col className='p-0 m-0 w-100'>
            <h5>{title}</h5>
            <span className='text-sm'>Average: {rating}</span><br/>
            <span className='text-sm'>Ratings: {noOfRating}</span>
          </Col>
        </Row>
      </Card>
    </Link>
  )
}

export default RecipeCardSmall