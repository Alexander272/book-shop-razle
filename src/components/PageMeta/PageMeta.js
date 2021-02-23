import * as React from 'react'
import { Helmet } from 'react-helmet-async'

const cutTags = (text = '') => {
    return text.replace(/<\/?.+?>/gi, '')
}

const prepareData = ({ title, description, image }) => {
    return {
        title: cutTags(title),
        description: cutTags(description).substr(0, 250),
        image,
    }
}

function PageMeta(props) {
    const { title, description, image } = prepareData(props)

    return (
        <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="twitter:title" content={title} />
            {Boolean(description) && (
                <meta name="description" content={description} />
            )}
            {Boolean(description) && (
                <meta property="og:description" content={description} />
            )}
            {Boolean(description) && (
                <meta property="twitter:description" content={description} />
            )}
            {Boolean(image) && <meta property="og:image" content={image} />}
        </Helmet>
    )
}

PageMeta.defaultProps = {
    title: 'Site',
    description: '',
    image: null,
}

export { PageMeta }
