function(doc) {
  var d = new Date(doc.updated_at);

  // Let's count after midnight smokes as belonging to the previous day
  if ( d.getHours() < 5 ) { d = new Date(doc.updated_at  - (24*60*60*1000) ); }

  var year  = d.getFullYear(),
      month = d.getMonth()+1,
      day   = d.getDate();

  emit([year, month, day], 1);
}
