import parsers from '../../../genericsImport/parsers/parsers.js'
import table from './table.js'

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
    confirmation
  }
} = table

export default {
  archive: {
    params: {
      id: [
        parsers.misc.required(),
        ...id.parsers
      ]
    },
    query: {
      confirmation: [
        parsers.misc.required(),
        ...confirmation.parsers
      ]
    }
  },
  create: {
    body: {
      content: [
        parsers.misc.required(),
        ...content.parsers
      ],
      startDate: [
        parsers.misc.required(),
        ...startDate.parsers
      ],
      endDate: [
        parsers.misc.required(),
        ...endDate.parsers
      ]
    }
  },
  delete: {
    params: {
      id: [
        parsers.misc.required(),
        ...id.parsers
      ]
    },
    query: {
      confirmation: [
        parsers.misc.required(),
        ...confirmation.parsers
      ]
    }
  },
  find: {
    params: {
      id: [
        parsers.misc.required(),
        ...id.parsers
      ]
    }
  },
  search: {
    query: {
      createdDate: [
        parsers.misc.value(),
        ...createdDate.parsers
      ],
      content: [
        parsers.misc.value(),
        ...content.parsers
      ],
      updatedDate: [
        parsers.misc.value(),
        ...updatedDate.parsers
      ]
    }
  },
  update: {
    body: {
      content: [
        parsers.misc.required(),
        ...content.parsers
      ],
      startDate: [
        parsers.misc.required(),
        ...startDate.parsers
      ],
      endDate: [
        parsers.misc.required(),
        ...endDate.parsers
      ]
    },
    params: {
      id: [
        parsers.misc.required(),
        ...id.parsers
      ]
    }
  }
}
