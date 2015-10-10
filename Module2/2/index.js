$(function () {


	var googleID = window.location.hash;
	googleID = googleID.replace("#", "");

	$(".button-bot").click(function() {

		var com = localStorage.getItem("compare");

		if (com === null) {
			com = [];
		} else
			com = JSON.parse(com);

		if ($.inArray(googleID, com) === -1)
			com.push(googleID);

		localStorage.setItem("compare", JSON.stringify(com));

	});

	$(".button-top").click(function() {
		var list = localStorage.getItem("compare");
		list = JSON.parse(list);
		alert(list.toString());
	});


	getBooks(googleID);

	function getBooks(id) {

		$(".main-list").html("");

		var url = "https://www.googleapis.com/books/v1/volumes/";

		url = url + id;

		$.ajax({

			url: url,
			dataType: 'jsonp',
			success: function(value) {

						var info = value.volumeInfo;
						var bookId = value.id;
						var title = info.title;
						var subtitle = info.subtitle;
						var author = info.authors;
						var publisher = info.publisher;
						var date = info.publishedDate;
						var desc = info.description;
						var isbn = info.industryIdentifiers;
						var img;
						var link = info.infoLink;
						var isbn10;
						var dimensions = info.dimensions;
						var rating = info.averageRating;
						var ratingCount = info.ratingsCount;
						var pages = info.pageCount;
						var sampleLink = value.accessInfo.webReaderLink;
						var mature = info.maturityRating;
						var sale = value.saleInfo.saleability;

						if (typeof pages === "undefined")
							pages = "Unknown amount of ";

						$(".main-content").append("<div id=\"" + bookId + "\"> </>");

						var id = "#" + bookId;

						if (typeof desc == "undefined")
							desc = "No description available.";

						if (typeof isbn !== "undefined") {
							isbn10 = isbn[0].identifier;
						} else
							isbn10 = "Does not exist";

						if (typeof info.imageLinks !== "undefined")
						{

							if (info.imageLinks.medium === undefined)
								img = info.imageLinks.smallThumbnail;
							else 
								img = info.imageLinks.small;
						} else
							img = "";

						$(".main-img").append("<img class=\"book-img\" alt=\"Image Not Available\" src=\"" + img + "\"/>");
						$(id).append("<p class=\"book-title\" id=\"" + bookId + "\">" + title + "</p>");
						$(id).append("<a class=\"link\" href=\"" + link + "\">" + link + "</a>");
						$(id).append("<p class=\"book-desc\"> " + desc + "</p>");
						$(id).append("<p class=\"book-info\"> Author: <span>" + author + "</span>. Published by: <span>" + publisher + "</span> in <span>" + date +"</span>. </p>");
						$(id).append("<p class=\"book-isbn\"> ISBN-10: <span>" + isbn10 + "</span>. </p>");

						if (typeof dimensions != "undefined")
						{
							var w = dimensions.width;
							var h = dimensions.height;
							var t = dimensions.thickness;

							$(id).append("<p class=\"other-info\"> Dimensions: <span>" + h + "</span> x <span>" + w + "</span> x <span>" + t + "</span> (" + pages + " pages). </p>");
						}

						$(id).append("<p class=\"other-info\"> Rated <span>" + rating + "</span> by <span>" + ratingCount + "</span> users. </p>");

						var button = "<a href=\"" + sampleLink + "\"> <button class=\"button\"> Sample </button> <a>";
						$(".main-img").append(button);

						if (mature === "NOT_MATURE")
						{
							$(id).append("<p> This book is suitable for all ages. </p>");
						} else
						{
							$(id).append("<p class=\"red\"> This book is meant for mature aduiences ONLY. </p>");
						}

						if (sale === "NOT_FOR_SALE")
						{
							$(id).append("<p> This book is not for sale at the moment. </p>");
						} else
						{
							$(id).append("<p> This book is currently for sale. </p>");
						}

						$(".button").show();

				}

		});

	}

});
