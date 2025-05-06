<?php
header("Content-Type: application/rss+xml; charset=UTF-8");

// RSS feed configuration
$rss_feed_title = "My Portfolio Updates";
$rss_feed_description = "Latest updates from my portfolio website";
$rss_feed_link = "http://" . $_SERVER['HTTP_HOST'] . str_replace('/rss.php', '', $_SERVER['REQUEST_URI']);
$rss_feed_language = "en-us";

// News items - in a real application, this would come from a database
$news_items = array(
    array(
        'title' => 'Added new project to portfolio',
        'description' => 'I have added my latest project to the projects page. Check it out!',
        'link' => $rss_feed_link . '/projects.html',
        'pubDate' => date('r', strtotime('-2 days'))
    ),
    array(
        'title' => 'Earned new certification',
        'description' => 'I have recently completed the Advanced JavaScript certification.',
        'link' => $rss_feed_link . '/certifications.html',
        'pubDate' => date('r', strtotime('-1 week'))
    ),
    array(
        'title' => 'Website redesign',
        'description' => 'The portfolio website has been redesigned with a minimalist style.',
        'link' => $rss_feed_link . '/index.html',
        'pubDate' => date('r', strtotime('-2 weeks'))
    )
);

// Generate RSS feed
echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<rss version="2.0">
    <channel>
        <title><?php echo htmlspecialchars($rss_feed_title); ?></title>
        <description><?php echo htmlspecialchars($rss_feed_description); ?></description>
        <link><?php echo htmlspecialchars($rss_feed_link); ?></link>
        <language><?php echo $rss_feed_language; ?></language>
        <lastBuildDate><?php echo date('r'); ?></lastBuildDate>
        
        <?php foreach ($news_items as $item): ?>
        <item>
            <title><?php echo htmlspecialchars($item['title']); ?></title>
            <description><?php echo htmlspecialchars($item['description']); ?></description>
            <link><?php echo htmlspecialchars($item['link']); ?></link>
            <pubDate><?php echo $item['pubDate']; ?></pubDate>
            <guid isPermaLink="false"><?php echo md5($item['title'] . $item['pubDate']); ?></guid>
        </item>
        <?php endforeach; ?>
    </channel>
</rss>