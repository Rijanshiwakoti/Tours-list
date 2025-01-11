import React from 'react'
export function Tours({
  id,
  image,
  name,
  info,
  price,
  handleDelete,
  readMore,
  setReadMore,
}) {
  const tourInfo = info
  const shortInfo = info.substring(0, 200)
  return (
    <div key={id} className="single-tour">
      <img src={image} alt="" className="img" />
      <h3 className="title">{name}</h3>
      <p className="tour-info">
        {!readMore ? tourInfo : shortInfo + '...'}
        <button
          type="button"
          className="info-btn"
          onClick={() => {
            setReadMore(!readMore)
          }}
        >
          {readMore ? `read more` : `see less`}
        </button>
      </p>
      <p className="tour-price">$ {price}</p>
      <button
        type="button"
        className="delete-btn"
        onClick={() => {
          handleDelete(id)
        }}
      >
        Not interested
      </button>
    </div>
  )
}
