import { createClient } from 'tinacms/dist/client';

function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
const HotelsPartsFragmentDoc = gql`
    fragment HotelsParts on Hotels {
  __typename
  hotel_id
  name
  stars
  location
  mainStreet
  addressNumber
  secondaryStreet
  contact {
    __typename
    type
    value
    tag
  }
  socialMedia {
    __typename
    name
    url
  }
  rooms {
    __typename
    name
    description
    size
    occupancy
    images
    price
    amenities {
      __typename
      amenities {
        ... on Icons {
          __typename
          icon
          name
        }
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
      }
    }
  }
  roomPrice
  coverImage
  gallery
  description_hotel {
    __typename
    lang_hotel
    content_hotel
  }
  amenities {
    __typename
    amenities {
      ... on Icons {
        __typename
        icon
        name
      }
      ... on Document {
        _sys {
          filename
          basename
          hasReferences
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
    }
  }
  highlight
}
    `;
const IconsPartsFragmentDoc = gql`
    fragment IconsParts on Icons {
  __typename
  icon
  name
}
    `;
const DestinationsPartsFragmentDoc = gql`
    fragment DestinationsParts on Destinations {
  __typename
  destination_id
  name
  country
  city
  description_destination {
    __typename
    lang_destination
    content_destination
  }
  tags {
    __typename
    tag
  }
  coverImage
  highlight
}
    `;
const OffersPartsFragmentDoc = gql`
    fragment OffersParts on Offers {
  __typename
  offer_id
  title
  coverImage
  description_offers {
    __typename
    lang_offer
    content_offer
  }
  expiration_date
  discount
  tags {
    __typename
    tag
  }
}
    `;
const HotelsDocument = gql`
    query hotels($relativePath: String!) {
  hotels(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HotelsParts
  }
}
    ${HotelsPartsFragmentDoc}`;
const HotelsConnectionDocument = gql`
    query hotelsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HotelsFilter) {
  hotelsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HotelsParts
      }
    }
  }
}
    ${HotelsPartsFragmentDoc}`;
const IconsDocument = gql`
    query icons($relativePath: String!) {
  icons(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...IconsParts
  }
}
    ${IconsPartsFragmentDoc}`;
const IconsConnectionDocument = gql`
    query iconsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: IconsFilter) {
  iconsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...IconsParts
      }
    }
  }
}
    ${IconsPartsFragmentDoc}`;
const DestinationsDocument = gql`
    query destinations($relativePath: String!) {
  destinations(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...DestinationsParts
  }
}
    ${DestinationsPartsFragmentDoc}`;
const DestinationsConnectionDocument = gql`
    query destinationsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: DestinationsFilter) {
  destinationsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...DestinationsParts
      }
    }
  }
}
    ${DestinationsPartsFragmentDoc}`;
const OffersDocument = gql`
    query offers($relativePath: String!) {
  offers(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...OffersParts
  }
}
    ${OffersPartsFragmentDoc}`;
const OffersConnectionDocument = gql`
    query offersConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: OffersFilter) {
  offersConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...OffersParts
      }
    }
  }
}
    ${OffersPartsFragmentDoc}`;
function getSdk(requester) {
  return {
    hotels(variables, options) {
      return requester(HotelsDocument, variables, options);
    },
    hotelsConnection(variables, options) {
      return requester(HotelsConnectionDocument, variables, options);
    },
    icons(variables, options) {
      return requester(IconsDocument, variables, options);
    },
    iconsConnection(variables, options) {
      return requester(IconsConnectionDocument, variables, options);
    },
    destinations(variables, options) {
      return requester(DestinationsDocument, variables, options);
    },
    destinationsConnection(variables, options) {
      return requester(DestinationsConnectionDocument, variables, options);
    },
    offers(variables, options) {
      return requester(OffersDocument, variables, options);
    },
    offersConnection(variables, options) {
      return requester(OffersConnectionDocument, variables, options);
    }
  };
}
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};

const client = createClient({ url: "http://localhost:4001/graphql", token: "", queries });

class Api {
  destacado;
  limit;
  VALID_FILE_EXTENSIONS = [".md", ".json", ".mdx"];
  constructor(destacado = false, limit = -1) {
    this.destacado = destacado;
    this.limit = limit;
  }
  // ----------------------------------------------------------------------------------------------------------------
  // Métod para obtener los archivos .md del directorio
  async getFiles(directory) {
    try {
      const fs = await import('node:fs/promises');
      const files = await fs.readdir(directory);
      return files.filter(
        (file) => this.VALID_FILE_EXTENSIONS.some(
          (ext) => file.toLowerCase().endsWith(ext)
        )
      );
    } catch (error) {
      console.error(`❌ Error leyendo el directorio ${directory}:`, error);
      return [];
    }
  }
  // ----------------------------------------------------------------------------------------------------------------
  // Añadir propiedad para el directorio de los hoteles
  hotelsDirectory = "src/data/hotels";
  // Ruta predeterminada
  async hotels() {
    try {
      const hotelFiles = await this.getFiles(this.hotelsDirectory);
      if (hotelFiles.length === 0) {
        console.warn(`⚠️ No se encontraron archivos en ${this.hotelsDirectory}`);
        return [];
      }
      const hotelPromises = hotelFiles.map(
        (item) => client.queries.hotels({ relativePath: item }).then((result) => result.data.hotels).catch((err) => {
          console.error(`❌ Error procesando ${item}:`, err);
          return null;
        })
      );
      const results = await Promise.all(hotelPromises);
      let hotels = results.filter(
        (hotel) => hotel !== null
      );
      if (this.destacado) {
        hotels = hotels.filter((hotel) => hotel.highlight === true);
      }
      if (this.limit > 0) {
        hotels = hotels.slice(0, this.limit);
      }
      return hotels;
    } catch (error) {
      console.error("❌ Error general obteniendo hoteles:", error);
      return [];
    }
  }
  // ----------------------------------------------------------------------------------------------------------------
  destinationsDirectory = "src/data/destinations";
  async destinations() {
    try {
      const destinationFiles = await this.getFiles(this.destinationsDirectory);
      if (destinationFiles.length === 0) {
        console.warn(`⚠️ No se encontraron archivos en ${this.hotelsDirectory}`);
        return [];
      }
      const destinationsPromises = destinationFiles.map(
        (item) => client.queries.destinations({ relativePath: item }).then((result) => result.data.destinations).catch((err) => {
          console.error(`❌ Error procesando ${item}:`, err);
          return null;
        })
      );
      const results = await Promise.all(destinationsPromises);
      let destinations = results.filter(
        (destination) => destination !== null
      );
      if (this.destacado) {
        destinations = destinations.filter(
          (destinations2) => destinations2.highlight === true
        );
      }
      if (this.limit > 0) {
        destinations = destinations.slice(0, this.limit);
      }
      return destinations;
    } catch (error) {
      console.error("❌ Error general obteniendo hoteles:", error);
      return [];
    }
  }
  // ----------------------------------------------------------------------------------------------------------------
  offersDirectory = "src/data/offers";
  async offers() {
    try {
      const offersFiles = await this.getFiles(this.offersDirectory);
      if (offersFiles.length === 0) {
        console.warn(`⚠️ No se encontraron archivos en ${this.offersDirectory}`);
        return [];
      }
      const offersPromises = offersFiles.map((item) => {
        return client.queries.offers({ relativePath: item }).then((result) => result.data.offers).catch((err) => {
          console.error(`❌ Error procesando ${item}:`, err);
          return null;
        });
      });
      const results = await Promise.all(offersPromises);
      let offers = results.filter(
        (offer) => offer !== null
      );
      offers = offers.filter(
        (offer) => offer.expiration_date !== null && new Date(offer.expiration_date) >= /* @__PURE__ */ new Date()
      );
      if (this.limit > 0) {
        offers = offers.slice(0, this.limit);
      }
      return offers;
    } catch (error) {
      console.error("❌ Error general leyendo Archivo:", error);
      return [];
    }
  }
}
function imageUrl({ url, back = 0 }) {
  if (url.startsWith("src/assets")) {
    return url;
  }
  const cleanPath = url.startsWith("~") || url.startsWith("/") ? url.substring(1) : url;
  let finalPath = `src/assets/${cleanPath}`;
  for (let i = 0; i < back; i++) {
    finalPath = `../${finalPath}`;
  }
  return finalPath;
}

export { Api as A, imageUrl as i };
