'use strict';
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.post');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
/*const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}*/
}
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAutorSelector = '.post-author',
  optTagsListSelector = ".tags.list",
  optAuthorsListSelector = ".authors.list"

function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector  + customSelector);
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log (linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(){

  return params;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  //let allTags = [];
  //const tagsParams = calculateTagsParams(allTags)
  //[NEW] create a new variable allTags with an empty object
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {
      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + ' </a></li> ';
      /* add generated code to html variable */
      html = html + tagHTML;
      /*if(allTags.indexOf(tagHTML) == -1){
        [NEW] add genereted code to allTags array
        allTags.push(tagHTML);
      }*/
      //[NEW2] check if this link is NOT already in allTags
      if(!allTags.hasOwnProperty(tag)){
        /*[NEW] add tag to alltag object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    //insert HTML of all the links into the tags wrapper 
    //END LOOP: for every article: 
    //[NEW] find list of tags in right column
    const TagList = document.querySelector(optTagsListSelector);
    /* [NEW] add html from allTags to tagList
    TagList.innerHTML = allTags.join(' ');*/
    //[new2] creat variable for all links HTML code
    let allTagsHTML = '';
    //[new2] START LOOP: for each tag in allTags:
    for(let Tag in allTags){
      //[new2] generate code of a link and add it to allTagsHTML
      allTagsHTML += '<li><a href="#">' + Tag  + '</a>' + '(' + allTags[Tag] + ') ' + '</li>';
    //[new2] END LOOP: for each tag in allTags:
    }
    //[new2] add html from allTagsHTML to tagList
    TagList.innerHTML = allTagsHTML;
    tagList.innerHTML = html;
    /*const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
      }*/
  }
}
generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let hrefLink of hrefLinks){
    /* add class active */
    hrefLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.list-horizontal a');
  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const allArticles = document.querySelectorAll(optArticleSelector);
  //[new] find list of authors in right colum
  const AuthorsList = document.querySelector(optAuthorsListSelector);
  let allAuthors = {};
  for (let article of allArticles){
    const authorList = article.querySelector(optArticleAutorSelector);
    let html = '';
    const authorTag = article.getAttribute('data-author');
    const authorHTML = 'By ' + '<a href="'+ authorTag + '">' + authorTag + '</a>';
    html = html + authorHTML;
    //console.log('html:', html);
    authorList.innerHTML = html;
    //[new]
    //let allAuthors = {};
    let author = authorTag;
    if(!allAuthors.hasOwnProperty(author)){
      //[new] add author to allAuthors
      allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
    //[new] creat variable for all links HTML code
    let allAuthorsHTML = '';
    //for(let author of allAuthors){
     //[new] generate code of link and add it to allAuthorsHtmL
     for(let author in allAuthors){
     allAuthorsHTML += '<li><a href="#">' + author + '</a>' + '(' + allAuthors[author] +')' + '</li>';  
     }
    AuthorsList.innerHTML = allAuthorsHTML;
  } 
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  generateTitleLinks('[data-author="' + href + '"]');
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('.post-author a');
  for (let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler)
  }
}
addClickListenersToAuthors();

