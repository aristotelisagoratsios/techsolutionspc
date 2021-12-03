<?php
/**
* @package RSJuno!
* @copyright (C) 2013 - 2015 www.rsjoomla.com
* @license GPL, http://www.gnu.org/licenses/gpl-3.0.html
*/
defined('_JEXEC') or die;

define('RSTEMPLATE_PATH', dirname(__FILE__));

// Include helper file
require_once dirname(__FILE__).'/classes/template.php';

// Initialize our template
$template = new RSTemplate($this);

// Load Bootstrap
$template->addBootstrap();
// Load jQuery
$template->addjQuery();
// Add Stylesheets
$template->addCSS('template.css');
$template->addCSS('theme/'.$this->params->get('templateTheme').'.css');
$template->addComponentCSS();
// Check version and load fixes
$template->addJoomlaCSS();
// Add Google Font
$template->addGoogleFont();
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
<jdoc:include type="head" />
<!--[if lt IE 9]>
<script src="<?php echo $this->baseurl ?><?php echo $template->getJSPath('html5', 'html5.js'); ?>"></script>
<![endif]-->
<?php 
// Add Google Analytics Tracking Code
echo $template->addGoogleAnalytics();
?>
</head>
	<body class="contentpane">
		<div id="rstpl-modal">
			<jdoc:include type="message" />
			<jdoc:include type="component" />
		</div>
	</body>
</html>
