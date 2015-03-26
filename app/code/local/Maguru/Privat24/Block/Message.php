<?php

/**
 * Maguru_Privat24 notification "form"
 */
class Maguru_Privat24_Block_Message extends Mage_Payment_Block_Form
{
    /**
     * Set template with message
     */
    protected function _construct()
    {
        $this->setTemplate('maguru/privat24/message.phtml');
        parent::_construct();
    }
}