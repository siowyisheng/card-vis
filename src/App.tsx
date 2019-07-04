/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import useFetch from 'react-fetch-hook'
import './App.css'
import ratings from './ratings'
import { Radar } from 'react-chartjs-2'
import find from 'lodash/find'
import 'typeface-roboto'
import LazyLoad from 'react-lazyload'

function App() {
  const { isLoading, data } = useFetch('https://api.fiveringsdb.com/cards')
  const categories = [
    'Impact',
    'Ease of Use',
    'Inexpensiveness',
    'Self Synergy',
  ]
  const options = {
    legend: {
      display: false,
    },
    scale: {
      display: true,
      ticks: {
        display: false,
        min: 0,
        max: 10,
        stepSize: 2,
      },
    },
  }
  return (
    <div style={{ fontFamily: 'Roboto' }} className="App">
      <header>
        <h1>Card Ratings for L5R Unicorn Conflict Cards</h1>
      </header>
      <div style={{ padding: '24px', display: 'flex', flexWrap: 'wrap' }}>
        {ratings.map(card => (
          <div
            css={{
              display: 'flex',
              flexWrap: 'wrap',
              marginBottom: '24px',
              justifyContent: 'center',
              width: '50%',
              '@media screen and (max-width: 1000px)': {
                width: '100%',
              },
            }}
            key={card.name}
          >
            <div
              style={{
                flex: '0 0 200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isLoading ? (
                <h4>Card image loading...</h4>
              ) : !!data &&
                !find(data.records, { name: card.name }).pack_cards[0]
                  .image_url ? (
                <h4>No image found</h4>
              ) : (
                <LazyLoad height={300} offset={100}>
                  <img
                    alt={card.name}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                    src={
                      !!data &&
                      find(data.records, { name: card.name }).pack_cards[0]
                        .image_url
                    }
                  />
                </LazyLoad>
              )}
            </div>
            <div style={{ flex: '0 0 350px' }}>
              <h2 style={{ color: '#444' }}>{card.name}</h2>
              <Radar
                options={options}
                data={{
                  labels: categories,
                  datasets: [
                    {
                      label: card.name,
                      backgroundColor: 'rgba(255,99,132,0.2)',
                      borderColor: 'rgba(255,99,132,1)',
                      pointBackgroundColor: 'rgba(255,99,132,1)',
                      pointBorderColor: '#fff',
                      data: [
                        card['Expected Impact'],
                        card['Ease of Use'],
                        card.Inexpensiveness,
                        card['Self Synergy'],
                      ],
                    },
                  ],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
