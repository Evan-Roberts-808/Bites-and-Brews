import React from 'react'
import Card from 'react-bootstrap/Card';

function Cards({data}) {
   const cards = data.map((data) => {
    return <Card className="col-sm-3 offset-sm-1">
    <Card.Img variant="top" src={data.image} />
    <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Subtitle>{data.pick}</Card.Subtitle>
        <Card.Text className="text-truncate">
            {data.description}
        </Card.Text>
        <button>View Recipe</button>
    </Card.Body>
    </Card>
   })
    
  return (
    <div className="row justify-content-center">
    {cards}
    </div>
  )
}

export default Cards