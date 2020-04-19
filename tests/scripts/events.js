import fetch from '@lcf.vs/generics/lib/tester/fetch.js'
import log from '@lcf.vs/generics/lib/tester/log.js'
import resolve from '@lcf.vs/generics/lib/tester/resolve.js'
import date from '@lcf.vs/generics/lib/types/date/date.js'

export default async () => {
  let response, uri

  /*
  uri = resolve('/events/create')

  response = await fetch(uri, {
    body: {
      content: 'event content',
      startDate: date.toW3CDatetime(new Date(), true),
      endDate: date.toW3CDatetime(date.addDays(new Date(), 1), true)
    },
    method: 'post',
    stack: false
  })

  log({ [uri]: response })

  uri = resolve('/events/update', response.body.id)

  response = await fetch(uri, {
    body: {
      content: `${response.body.content} (updated)`,
      startDate: date.toW3CDatetime(new Date(), true),
      endDate: date.toW3CDatetime(date.addDays(new Date(), 1), true)
    },
    method: 'post',
    stack: false
  })

  log({ [uri]: response })

  uri = resolve('/events/find', response.body.id)

  response = await fetch(uri, {})

  log({ [uri]: response })
  */

  uri = resolve('/calendar/wek/2020-04-20')

  response = await fetch(uri, {
   /* query: {
      //content: response.body.content
    },*/
    stack: false
  })

  log({ [uri]: response })
/*
  uri = resolve('/events/archive', response.body[0].id)

  response = await fetch(uri, {
    query: {
      confirmation: '1'
    },
    stack: false
  })

  log({ [uri]: response })


 */
}
