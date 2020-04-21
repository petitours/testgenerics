
import table from './table.js'
import parsers from '../../../genericsImport/parsers/parsers.js'

const {
  columns: {
    content,
    createdDate,
    endDate,
    id,
    startDate,
    updatedDate
  },
  virtuals: {
    windows,
    dateCentral,
    confirmation,
    period
  }
} = table

// search input for all search routes
const searchQuery = {
  ...createdDate.parsers([
    parsers.misc.value()
  ]),
  ...content.parsers([
    parsers.misc.value()
  ]),
  ...updatedDate.parsers([
    parsers.misc.value()
  ])
}

export default {
  archive: {
    params: {
      ...id.parsers([
        parsers.misc.required()
      ])
    },
    query: {
      ...confirmation.parsers([
        parsers.misc.required()
      ])
    }
  },
  create: {
    body: {
      ...content.parsers([
        parsers.misc.required()
      ]),
      ...period.parsers([
        parsers.misc.required()
      ])
    }
  },
  getCreate: {
  },
  delete: {
    params: {
      ...id.parsers([
        parsers.misc.required()
      ])
    },
    query: {
      ...confirmation.parsers([
        parsers.misc.required()
      ])
    }
  },
  find: {
    params: {
      ...id.parsers([
        parsers.misc.required()
      ])
    }
  },
  update: {
    body: {
      ...content.parsers([
        parsers.misc.required()
      ]),
      ...startDate.parsers([
        parsers.misc.required()
      ]),
      ...endDate.parsers([
        parsers.misc.required()
      ])
    },
    params: {
      ...id.parsers([
        parsers.misc.required()
      ])
    }
  },
  searchGenericGeneric: {
    params: {
      ...windows.parsers([
        parsers.misc.required()
      ]),
      ...dateCentral.parsers([
        parsers.misc.required()
      ])
    },
    query: searchQuery
  },
  searchGenericNow: {
    params: {
      ...windows.parsers([
        parsers.misc.required()
      ])
    },
    query: searchQuery
  }
}
