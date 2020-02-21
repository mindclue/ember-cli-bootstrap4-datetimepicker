import $ from 'jquery';
import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/bs-datetimepicker';
import DynamicAttributeBindings from '../-private/dynamic-attribute-bindings';

const {
  defaults
} = $.fn.datetimepicker;

export default Component.extend(DynamicAttributeBindings, {
  attributeBindings: null,
  layout,
  tagName: 'div',
  classNames: ['input-group date'],
  placeholder: '',
  openOnFocus: false,
  isMobile: /Android|iPhone|iPod|Windows Phone/i.test(navigator.userAgent),
  showIcon: true,

  iconClasses: computed('isTime', function() {
    if (this.get('isTime')) {
      return this.getWithDefault('config.icons.time', defaults.icons.time);
    }

    return this.getWithDefault('config.icons.date', defaults.icons.date);
  }),

  didInsertElement() {
    this._super(...arguments);

    let icons = {
      clear: this.getWithDefault('config.icons.clear', defaults.icons.clear),
      close: this.getWithDefault('config.icons.close', defaults.icons.close),
      date: this.getWithDefault('config.icons.date', defaults.icons.date),
      down: this.getWithDefault('config.icons.down', defaults.icons.down),
      next: this.getWithDefault('config.icons.next', defaults.icons.next),
      previous: this.getWithDefault('config.icons.previous', defaults.icons.previous),
      time: this.getWithDefault('config.icons.time', defaults.icons.time),
      today: this.getWithDefault('config.icons.today', defaults.icons.today),
      up: this.getWithDefault('config.icons.up', defaults.icons.up)
    };

    this.$().datetimepicker({
      allowInputToggle: this.getWithDefault('allowInputToggle', defaults.allowInputToggle),
      calendarWeeks: this.getWithDefault('calendarWeeks', defaults.calendarWeeks),
      date: this.getWithDefault('date', null),
      daysOfWeekDisabled: this.getWithDefault('daysOfWeekDisabled', defaults.daysOfWeekDisabled),
      disabledDates: this.getWithDefault('disabledDates', defaults.disabledDates),
      disabledHours: this.getWithDefault('disabledHours', defaults.disabledHours),
      enabledDates: this.getWithDefault('enabledDates', defaults.enabledDates),
      enabledHours: this.getWithDefault('enabledHours', defaults.enabledHours),
      focusOnShow: this.getWithDefault('focusOnShow', defaults.focusOnShow),
      format: this.getWithDefault('format', defaults.format),
      icons,
      ignoreReadonly: this.isMobile || defaults.ignoreReadonly,
      inline: this.getWithDefault('inline', defaults.inline),
      locale: this.getWithDefault('locale', defaults.locale),
      maxDate: this.getWithDefault('maxDate', defaults.maxDate),
      minDate: this.getWithDefault('minDate', defaults.minDate),
      showClear: this.getWithDefault('showClear', defaults.showClear),
      showClose: this.getWithDefault('showClose', defaults.showClose),
      showTodayButton: this.getWithDefault('showTodayButton', defaults.showTodayButton),
      sideBySide: this.getWithDefault('sideBySide', defaults.sideBySide),
      timeZone: this.getWithDefault('timeZone', defaults.timeZone),
      useCurrent: this.getWithDefault('useCurrent', false),
      viewDate: this.getWithDefault('viewDate', defaults.viewDate),
      viewMode: this.getWithDefault('viewMode', defaults.viewMode),
      widgetParent: this.getWithDefault('widgetParent', defaults.widgetParent),
      widgetPositioning: this.getWithDefault('widgetPositioning', defaults.widgetPositioning)
    }).on('dp.change', e => {
      // Convert moment to js date or default to null
      let newDate = e.date && e.date.toDate() || null;

      this.set('date', newDate);
      if (this.change) {
        this.change(newDate);
      }
    });

    this.addObserver('date', this, this.setDate);
    this.addObserver('maxDate', this, this.setMaxDate);
    this.addObserver('minDate', this, this.setMinDate);
    this.addObserver('locale', this, this.setLocale);
    this.addObserver('format', this, this.setFormat);
    this.addObserver('viewMode', this, this.setViewMode);
    this.addObserver('timeZone', this, this.setTimeZone);
  },

  setDate() {
    this.$().data('DateTimePicker').date(this.getWithDefault('date', null));
  },
  setMaxDate() {
    this.$().data('DateTimePicker').maxDate(this.get('maxDate'));
  },
  setMinDate() {
    this.$().data('DateTimePicker').minDate(this.get('minDate'));
  },
  setLocale() {
    this.$().data('DateTimePicker').locale(this.get('locale'));
  },
  setFormat() {
    this.$().data('DateTimePicker').format(this.get('format'));
  },
  setViewMode() {
    this.$().data('DateTimePicker').viewMode(this.get('viewMode'));
  },
  setTimeZone() {
    this.$().data('DateTimePicker').timeZone(this.get('timeZone'));
  },

  willDestroyElement() {
    this._super(...arguments);
    this.removeObserver('date', this, this.setDate);
    this.removeObserver('maxDate', this, this.setMaxDate);
    this.removeObserver('minDate', this, this.setMinDate);
    this.removeObserver('locale', this, this.setLocale);
    this.removeObserver('format', this, this.setFormat);
    this.removeObserver('viewMode', this, this.setViewMode);
    this.removeObserver('timeZone', this, this.setTimeZone);

    // Running the `ember` application embedded might cause the DOM to be cleaned before
    let dateTimePicker = this.$().data('DateTimePicker');
    if (dateTimePicker) {
      dateTimePicker.destroy();
    }
  },

  actions: {
    focus() {
      if (this.get('openOnFocus')) {
        this.$().data('DateTimePicker').show();
      }
    }
  }
});
