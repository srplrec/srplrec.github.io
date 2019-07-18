function getHostName(url) {
     var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
     if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
     return match[2];
     }
     else {
         return null;
     }
 }

 $(document).ready(function(){
     //Inserting URL params in UI and metadata
     var currentURL = window.location.href;
     var urlParams = new URLSearchParams(window.location.search);
     $('meta[property="og:url"]').attr("content", currentURL);
     $('meta[property="music:album:url"]').attr("content", currentURL);
     if(urlParams.has('img')){
         var image = urlParams.get('img');
         $(".card-image").show().html("<img src=\"" + image + "\">");
         $('meta[property="og:image"]').attr("content", image);
         $('meta[name="twitter:image"]').attr("content", image);
     }
     if(urlParams.has('embed')){
         var embed = urlParams.get('embed');
         $(".card-embed").show().html("<iframe src=\"" + embed + "\"></iframe>");
         $('meta[name="twitter:player"]').attr("content", embed);
     }
     if(urlParams.has('title') && urlParams.has('artist')){
         var title = urlParams.get('artist') + " – " + urlParams.get('title');
         var description = "Get \"" + title + "\" now!";
         $(document).prop('title', title);
         $('meta[name="description"]').attr("content", description);
         $('meta[property="og:title"]').attr("content", title);
         $('meta[name="twitter:title"]').attr("content", title);
         $('meta[name="twitter:description"]').attr("content", description);
         $(".card-title").show().html(title);
     }
     if(urlParams.has('links')){
         $(".card-links").show();
         var links = urlParams.get('links').split("|");
         $.each(links, function(key, url){
            var hostname = getHostName(url);
            //<img src=\"http://logo.clearbit.com/" + hostname + "\">
            $(".card-links").append("<li><a target=\"_blank\" href=\"" + url + "\">"  + hostname + "</a>");
         });
     }
 });