$(function () {

	//$(".main-list").html();

	$(".books-table").hide();

	var list = localStorage.getItem("compare");
	list = JSON.parse(list);

	if (list === null)
		list = [];

	$.each(list, function(key, value) {

		var k = $(".books-table").css("display");

		if (k === "none")
			$(".books-table").show();

		getBooks(value);
	});

	$(".clear").click(function() {
		$(".books-table").hide();
		localStorage.removeItem("compare");
		$(".oops").show();
	});

	function getBooks(id) {

		$(".oops").hide();

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

						if (typeof author !== "undefined")
							author = author[0];
						else
							author = "Unknown";

						if (typeof isbn !== "undefined")
							isbn10 = isbn[0].identifier;
						else
							isbn10 = "Unknown";

						var row = "<tr> <td>" + title + "</td> <td>" + author + "</td> <td>" + date + "</td> <td>" + publisher + "</td> <td>" + isbn10 + "</td> <td>" + pages + "</td> </tr>";

						$(".books-table").append(row);

						
				}

		});

	}

});
