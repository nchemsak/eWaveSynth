"use strict";
var $$;
// Single DOM element selection
window.$ = function(selector) {
  return document.querySelector(selector);
};
// Multiple DOM element selection
window.$$ = function(selector) {
    var items   = {};
    var results = Array.prototype.slice.call(document.querySelectorAll(selector));
    var length  = results.length;

    for (var i = 0 ; i < length; i++) {
        items[i] = results[i];
    }

    items.length = length;
    items.splice = [].splice();

    items.each = function(callback) {
        for (var i = 0 ; i < length; i++) {
            callback.call(items[i]);
        }
    };
    items.on = function (event, fn) {
        [].forEach.call(this, function (el) {
            el.on(event, fn);
        });
        return this;
    };
    return items;
};
// Bind event using "on"
Element.prototype.on = Element.prototype.addEventListener;
// Add trigger method
Element.prototype.trigger = function (type, data) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
};
//===================================================
// Sequencer
var Sequencer = function () {
    var self = this;
    self.looping    = false;
    self.beat       = 0;
    self.tempo      = 120;
    self.steps      = 16;
    self.draw = function () {
        var table = '';
        $$('audio').each(function () {
            this.load();
            this.play();
            this.pause();
            table += '<tr class="' + this.id + '">';
            table += '<td>' + this.id + '</td>';
            for (var i = 0; i < self.steps; i++) {
                table += '<td class="beat col' + i + '">&nbsp;</td>';
            }
            table += '</tr>';
        });
        $('table').innerHTML = table;
    };
    self.clean = function () {
        $$('.hit').each(function () {
            this.classList.remove('hit');
        });
    };

    self.loop = function () {
        if (!self.looping) {
            return;
        }
        self.beat = (self.beat + 1) % self.steps;
        self.clean();
        $$('audio').each(function () {
            var hit = $('table tr.' + this.id + ' td.col' + self.beat + '.on');
            if (hit) {
                hit.classList.add('hit');
                this.currentTime = 0;
                this.play();
            }
        });
        self.looping = setTimeout(function () { self.loop(); }, 60000 / self.tempo / 4);
    };
    self.bind = function () {
        $$('.beat').on('click', function () {
            this.classList.toggle('on');
        });
        $('#play').on('click', function () {
            if (self.looping) {
                return;
            }
            self.looping = setTimeout(function () { self.loop(); }, 60000 / self.tempo / 4);
        });
        $('#pause').on('click', function () {
            clearTimeout(self.looping);
            self.looping = false;
        });
        $('#stop').on('click', function () {
            clearTimeout(self.looping);
            self.looping = false;
            self.clean();
            self.beat = 0;
        });
        $('#back').on('click', function () {
            self.beat = 0;
        });
        $('#tempo').on('change', function () {
            if (this.value > 1 && this.value < 300) {
                self.tempo = this.value;
            }
        });
        $('#steps').on('change', function () {
            self.steps = this.value;
            // TODO bug here we redraw everything and should keep ON cols
            self.draw();
            // rebind the beats
            $$('.beat').on('click', function () {
                this.classList.toggle('on');
            });
        });
        $('#tempo').value = self.tempo;
        $('#steps').value = self.steps;
        $$('.pattern').on('click', function () {
            self.pattern(this.dataset.pattern);
        });
    };
    self.patterns = {
        step1: {
            name: 'Drum n Bass',
            tempo: 180,
            steps: 16,
            pattern: {
                0: [ 'snd2', 'snd1' ],
                1: null,
                2: [ 'snd1' ],
                3: null,
                4: [ 'snd3', 'snd1' ],
                5: null,
                6: [ 'snd1' ],
                7: null,
                8: [ 'snd1' ],
                9: null,
                10: [ 'snd2' ],
                11: null,
                12: [ 'snd3' ],
                13: [ 'snd2' ],
                14: null,
                15: null
            }
        },
        step2: {
            name: 'Breakbeat',
            tempo: 136,
            steps: 16,
            pattern: {
                0: [ 'snd5', 'snd2' ],
                1: null,
                2: [ 'snd5', 'snd2' ],
                3: null,
                4: [ 'snd5', 'snd3' ],
                5: null,
                6: [ 'snd5' ],
                7: [ 'snd3' ],
                8: [ 'snd5' ],
                9: [ 'snd3' ],
                10: [ 'snd5', 'snd2' ],
                11: null,
                12: [ 'snd5', 'snd3' ],
                13: null,
                14: [ 'snd5' ],
                15: [ 'snd3' ]
            }
        },
        step3: {
            name: 'Reggae',
            tempo: 70,
            steps: 16,
            pattern: {
                0: [ 'snd1', 'snd2' ],
                1: [ 'snd5' ],
                2: [ 'snd1', 'snd6' ],
                3: [ 'snd5' ],
                4: [ 'snd1', 'snd2', 'snd3' ],
                5: [ 'snd5' ],
                6: [ 'snd1', 'snd6' ],
                7: [ 'snd1' ],
                8: [ 'snd1' ],
                9: [ 'snd5' ],
                10: [ 'snd1', 'snd6' ],
                11: [ 'snd5' ],
                12: [ 'snd1', 'snd2', 'snd3' ],
                13: [ 'snd5' ],
                14: [ 'snd1', 'snd6' ],
                15: [ 'snd5' ]
            }
        },
        step4: {
            name: 'Jungle',
            tempo: 160,
            steps: 16,
            pattern: {
                0: [ 'snd1', 'snd2' ],
                1: null,
                2: [ 'snd1' ],
                3: null,
                4: [ 'snd3' ],
                5: [ 'snd1' ],
                6: [ 'snd1', 'snd6' ],
                7: [ 'snd1' ],
                8: [ 'snd1' ],
                9: [ 'snd1' ],
                10: [ 'snd2' ],
                11: null,
                12: [ 'snd1', 'snd3' ],
                13: null,
                14: [ 'snd1', 'snd6' ],
                15: [ 'snd6' ]
            }
        }
    };
    self.pattern = function (pattern) {
        $('#stop').trigger('click');
        // get real map from pattern
        pattern = self.patterns[pattern];
        $('#tempo').value = self.tempo = pattern.tempo;
        $('#steps').value = self.steps = pattern.steps;
        self.draw();
        // rebind the beats
        $$('.beat').on('click', function () {
            this.classList.toggle('on');
        });
        for (var step in pattern.pattern) {
            if (!pattern.pattern[step]) {
                continue;
            }
            for (var i in pattern.pattern[step]) {
                $('tr.' + pattern.pattern[step][i] + ' td.col' + step).classList.add('on');
            }
        }
        $('#play').trigger('click');
    };
};
var instance = new Sequencer();
instance.draw();
instance.bind();
