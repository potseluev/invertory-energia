$(document).ready(function()
  {
    SetHeightPage();
    //$("header").sticky({topSpacing:0});
  }
);
$(window).resize(function()
  {
    SetHeightPage();
  }
);
function SetHeightPage() {

  var ContentHeight = $('#content').position().top + $('#content').height() + NaN2Zero(parseInt($('#content').css('padding-bottom')));
  var AsideHeight = $('#aside').position().top + $('#aside').height() + NaN2Zero(parseInt($('#aside').css('padding-bottom')));
  var MinHeight = ContentHeight > AsideHeight? ContentHeight: AsideHeight;
  var NewHeight = $(window).height() - GetAllHeightElement('#poster') - GetAllHeightElement('footer') - GetAllHeightElement('header') - GetAllHeightElement('#page') + $('#page').height();
  if (MinHeight - GetAllHeightElement('#page') + $('#page').height() < NewHeight) $('#page').height(NewHeight);

}
function GetAllHeightElement(Selector) {
  return $(Selector).height() +
  NaN2Zero(parseInt($(Selector).css('margin-top'))) +
  NaN2Zero(parseInt($(Selector).css('margin-bottom'))) +
  NaN2Zero(parseInt($(Selector).css('padding-top'))) +
  NaN2Zero(parseInt($(Selector).css('padding-bottom')));
}
function NaN2Zero(n) {
  return isNaN(n)? 0: n;
}

