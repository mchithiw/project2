$(function () {

	getBooks();

	function getBooks() {

		$(".main-list").html("");

		var url = "https://www.googleapis.com/books/v1/users/103130314035126240690/bookshelves/1001/volumes?key=AIzaSyAv7zh6lMrlamTKFumUcMXi4Y8sEdThbPs";

		$.ajax({

			url: url,
			dataType: 'jsonp',
			success: function(data) {

				var counter = 0;
				var items = data.items;

				$.each(items, function(key, value) {

					if (typeof value !== "undefined")
					{
						var info = value.volumeInfo;
						var bookId = value.id;
						var title = info.title;
						var author = info.authors;
						var publisher = info.publisher;
						var date = info.publishedDate;
						var desc = info.description;
						var isbn = info.industryIdentifiers;
						var img;
						var link = info.infoLink;
						var isbn10;

						var li = "<li class=\"book\" id=\"" + counter + "\"></li>";
						$(".main-list").append(li);

						var id = "#" + counter;

						if (typeof desc == "undefined")
							desc = "No description available.";

						if (typeof isbn !== "undefined") {
							isbn10 = isbn[0].identifier;
						} else
							isbn10 = "Does not exist";

						if (typeof info.imageLinks !== "undefined")
						{
							img = info.imageLinks.smallThumbnail;
						} else
							img = "";

						$(id).append("<img class=\"book-img\" alt=\"Image Not Available\" src=\"" + img + "\"/>");
						$(id).append("<p class=\"book-title\" id=\"" + bookId + "\">" + title + "</p>");
						$(id).append("<a class=\"link\" href=\"" + link + "\">" + link + "</a>");
						$(id).append("<p class=\"book-desc\"> " + desc + "</p>");
						$(id).append("<p class=\"book-info\"> Author: <span>" + author + "</span>. Published by: <span>" + publisher + "</span> in <span>" + date +"</span>. </p>");
						$(id).append("<p class=\"book-isbn\"> ISBN-10: <span>" + isbn10 + "</span>. </p>");


						counter++;
					}

				});

				$(".book-title").click(function() {
					
					var googleID = $(this).attr("id");

					var url = "../2/index.html#" + googleID;

					window.location.href = url;


				});

			}

		});

	}

});
