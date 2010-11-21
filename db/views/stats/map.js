function(doc) {
  var d = new Date(doc.updated_at);
  emit([d.getFullYear(), d.getMonth()+1, d.getDate()], 1);
}
