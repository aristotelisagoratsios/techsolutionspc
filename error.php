<?php
/**
* @package RSJuno!
* @copyright (C) 2013 - 2015 www.rsjoomla.com
* @license GPL, http://www.gnu.org/licenses/gpl-3.0.html
*/
defined('_JEXEC') or die;

if(!defined('RSTEMPLATE_PATH')){
	define('RSTEMPLATE_PATH', dirname(__FILE__));
}

// Include helper file
require_once dirname(__FILE__).'/classes/template.php';
$params		= JFactory::getApplication()->getTemplate(true)->params;
$template 	= new RSTemplate($this, $params);
$googleFont = $params->get('googleFont');
$debug 		= (defined('JDEBUG') && JDEBUG) || JFactory::getConfig()->get('debug_lang');
$jquery		= $params->get('loadJQuery', 1);
$bootstrap	= $params->get('loadBootstrap', 1);
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title><?php echo $this->title; ?> <?php echo $this->error->getMessage();?></title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="language" content="<?php echo $this->language; ?>" />
	<link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon" />
	<?php if ($bootstrap) { ?>
		<link rel="stylesheet" href="<?php echo $this->baseurl; ?><?php echo $template->getCSSPath('bootstrap', 'bootstrap.min.css'); ?>" type="text/css" />
		<link rel="stylesheet" href="<?php echo $this->baseurl; ?><?php echo $template->getCSSPath('bootstrap', 'bootstrap-responsive.min.css'); ?>" type="text/css" />
		<link rel="stylesheet" href="<?php echo $this->baseurl; ?><?php echo $template->getCSSPath('bootstrap', 'bootstrap-extended.css'); ?>" type="text/css" />
		<?php if ($this->direction == 'rtl') { ?>
		<link rel="stylesheet" href="<?php echo $this->baseurl; ?><?php echo $template->getCSSPath('bootstrap', 'bootstrap-rtl.css'); ?>" type="text/css" />
		<?php } ?>
	<?php } ?>
	<?php if ($jquery) { ?>
		<script src="<?php echo $this->baseurl; ?><?php echo $template->getJSPath('jquery', 'jquery.min.js'); ?>" type="text/javascript"></script>
		<script src="<?php echo $this->baseurl; ?><?php echo $template->getJSPath('jquery', 'jquery-noconflict.js'); ?>" type="text/javascript"></script>
	<?php } ?>
	<?php if ($bootstrap) { ?>
	<script src="<?php echo $this->baseurl; ?><?php echo $template->getJSPath('bootstrap', 'bootstrap.min.js'); ?>" type="text/javascript"></script>
	<?php } ?>
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/template.css" type="text/css" />
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/theme/<?php echo $params->get('templateTheme'); ?>.css" type="text/css" />
	<?php if ($debug) { ?>
	<link rel="stylesheet" href="<?php echo $this->baseurl; ?>/media/cms/css/debug.css" type="text/css" />
	<?php } ?>
	<!--[if lt IE 9]>
		<link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template;?>/css/ie.css" rel="stylesheet" type="text/css"></script>
		<script src="<?php echo $this->baseurl; ?><?php echo $template->getJSPath('html5', 'html5.js'); ?>"></script>
	<![endif]-->
	<?php if ($googleFont) { ?>
		<link href="http://fonts.googleapis.com/css?family=<?php echo urlencode($googleFont);?>" rel="stylesheet" type="text/css" />
		<style type="text/css">
			h1, .rstpl-read-more-link-all {
				font-family: '<?php echo $template->escape($googleFont); ?>', sans-serif;
			}
		</style>
	<?php } ?>
	<?php 
		// Add Google Analytics Tracking Code
		echo $template->addGoogleAnalytics();
	?>
</head>
<body class="site">
	<div class="body">
		<div id="rstpl-before-header"></div>
		<div class="rstpl-normal-inner">
			<div class="container">
				<div class="row-fluid">
					<div id="content" class="span12 rstpl-error-page rstpl-float-center">
						<!-- Begin Content -->
						<h1 class="page-header"><?php echo JText::_('JERROR_LAYOUT_PAGE_NOT_FOUND'); ?></h1>
						<div class="well">
							<p class="textalign-center"><?php echo JText::_('JERROR_LAYOUT_PLEASE_CONTACT_THE_SYSTEM_ADMINISTRATOR'); ?></p>
							<div class="textalign-center rstpl-actual-error">
								<div class="label label-inverse"><?php echo $this->error->getCode(); ?></div> 
								<p><?php echo $this->error->getMessage();?></p>
							</div>
							<hr />
							<div class="row-fluid">
								<div class="span12">
									<?php if (JModuleHelper::getModule('search')) : ?>
										<p class="textalign-center"><strong><?php echo JText::_('JERROR_LAYOUT_SEARCH'); ?></strong></p>
										<p class="textalign-center"><?php echo JText::_('JERROR_LAYOUT_SEARCH_PAGE'); ?></p>
										<div class="error-search">
										<?php
											$module = JModuleHelper::getModule('search');
											echo JModuleHelper::renderModule($module);
										?>
										</div>
									<?php endif; ?>
									<p class="textalign-center"><strong><?php echo JText::_('JERROR_LAYOUT_ERROR_HAS_OCCURRED_WHILE_PROCESSING_YOUR_REQUEST'); ?></strong></p>
									<p class="textalign-center"><?php echo JText::_('JERROR_LAYOUT_NOT_ABLE_TO_VISIT'); ?></p>
									<ul>
										<li><?php echo JText::_('JERROR_LAYOUT_AN_OUT_OF_DATE_BOOKMARK_FAVOURITE'); ?></li>
										<li><?php echo JText::_('JERROR_LAYOUT_MIS_TYPED_ADDRESS'); ?></li>
										<li><?php echo JText::_('JERROR_LAYOUT_SEARCH_ENGINE_OUT_OF_DATE_LISTING'); ?></li>
										<li><?php echo JText::_('JERROR_LAYOUT_YOU_HAVE_NO_ACCESS_TO_THIS_PAGE'); ?></li>
									</ul>
								</div>
							</div>
						</div>
						<!-- End Content -->
					</div>
				</div>
			</div>
		</div>
		<div class="rstpl-prev-content">
			<div class="rstpl-colored-inner">
				<div class="container textalign-center">
					<a class="rstpl-read-more-link-all" href="<?php echo JURI::root(); ?>"><?php echo JText::_('JERROR_LAYOUT_GO_TO_THE_HOME_PAGE'); ?></a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>