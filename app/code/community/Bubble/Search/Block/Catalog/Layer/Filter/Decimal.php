<?php
/**
 * Handles decimal attribute filtering in layered navigation.
 *
 * @category Bubble
 * @package Bubble_Search
 * @author Johann Reinke <johann@bubblecode.net>
 */
class Bubble_Search_Block_Catalog_Layer_Filter_Decimal extends Mage_Catalog_Block_Layer_Filter_Abstract
{
    /**
     * Defines specific filter model name.
     *
     * @see Bubble_Search_Model_Catalog_Layer_Filter_Decimal
     */
    public function __construct()
    {
        parent::__construct();
        $this->_filterModelName = 'bubble_search/catalog_layer_filter_decimal';
    }

    /**
     * Prepares filter model.
     *
     * @return Bubble_Search_Block_Catalog_Layer_Filter_Decimal
     */
    protected function _prepareFilter()
    {
        $this->_filter->setAttributeModel($this->getAttributeModel());

        return $this;
    }

    /**
     * Adds facet condition to filter.
     *
     * @see Bubble_Search_Model_Catalog_Layer_Filter_Decimal::addFacetCondition()
     * @return Bubble_Search_Block_Catalog_Layer_Filter_Decimal
     */
    public function addFacetCondition()
    {
        $this->_filter->addFacetCondition();

        return $this;
    }
}
