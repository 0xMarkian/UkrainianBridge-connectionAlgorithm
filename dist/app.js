'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Form = require('./Form.js');

var _Form2 = _interopRequireDefault(_Form);

var _sendMails = require('./sendMails');

var _sendMails2 = _interopRequireDefault(_sendMails);

var _reservePerson = require('./inputData/reservePerson');

var _reservePerson2 = _interopRequireDefault(_reservePerson);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var form = new _Form2.default({
  excelData: {
    fileName: './inputData/input.xlsx',
    sheetName: 'FormAnswers',
    stateKeyName: 'Фактичне місце проживання/Фактическое место жительства'
  }, reservePerson: _reservePerson2.default });

var pairs = form.generatePairs();

pairs.forEach(function (pair) {
  console.log(pair);console.log('\n\n');
});

var email = 'psyhonaft0@gmail.com';
var index = pairs.findIndex(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      email1 = _ref2[0].email,
      email2 = _ref2[1].email;

  return email1 === email || email2 === email;
});
console.log(index);

(0, _sendMails2.default)(pairs.slice(86));
