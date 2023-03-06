import React from 'react'
import { Helmet } from 'react-helmet'

function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProsp = {
  title: 'Welcome to proshop',
  keywords: 'Electronic, iphoe, mac',
  description: 'Best online eclectonics store',
}

export default Meta
