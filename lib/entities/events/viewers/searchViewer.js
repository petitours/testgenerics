
export default function searchViewer () {
  return async ({ entities, params:{windows,dateCentral }, range: { start, end } }) => ({
    body: entities,
    meta: {
      title: 'TatAgenda du ' + start.toLocaleString() + ' au ' + end.toLocaleString() + ' centré sur ' + dateCentral.toLocaleString()
    }
  })
}
