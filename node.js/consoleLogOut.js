function formatedLogOut(string) {
	var currentDate = new Date();
	console.log('[' + 
	formatDate(currentDate) + ' :: ' +
	currentDate.getHours() + ':' + 
	currentDate.getMinutes() + ':' + 
	currentDate.getSeconds() + ':' + 
	currentDate.getMilliseconds() + 
	']' + ' - ' + string); 
}

function formatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
};

exports.log = formatedLogOut; 