import React,{useRef,useEffect, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title,category}) => {

  const [apiData,setApiData]=useState([])
  const cardsRef=useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjI1ZDQyNGQ0NThhOWNlOGY3MGEzZGUzMzc3ZGZiOSIsIm5iZiI6MTczNTM4Nzg4MC43NTAwMDAyLCJzdWIiOiI2NzZmZWFlOGNmZTYyNjQ0ZGYxMmU1MDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4Fy5ofwM_3mcZRb5jcckdwTxS-TC_QeW4MLdKBLjqKg'
    }
  };
  
 
  const handwheel=(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft+=event.deltaY;

  }
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel',handwheel)
  },[])


  return (
    <div className='title-Cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link  to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
