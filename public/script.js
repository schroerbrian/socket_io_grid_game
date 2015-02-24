var socket = io(),
    hash = window.location.hash.replace('#/',''),
    gridDimension = parseInt(hash);

function toggleClick(id, hasX) {
  var xMarkUp = '<div class="x-marker">X</div>',
      el = document.getElementById(id);
  if (hasX) {
    el.innerHTML = '';
  } else {
    el.innerHTML = xMarkUp;
  }
}

function clickToggled(self) {
  var xMarkUp = '<div class="x-marker">X</div>',
      hasX = self.innerHTML === xMarkUp;
  socket.emit('message', {id: self.id, hasX: hasX});
  toggleClick(self.id, hasX)
}

socket.on('message', function(data) {
    toggleClick(data.id, data.hasX);
});

function createGrid() {
  var gridContainer = document.getElementById('js-grid');

  if (gridDimension) {
    for(var i=0; i < gridDimension; i++) {
      var row = document.createElement('div'),
          rowId = 'grid-row-' + i,
          rowEl;
      row.setAttribute('class', 'grid-row');
      row.setAttribute('id', rowId);
      gridContainer.appendChild(row);
      rowEl = document.getElementById(rowId);

      for(var j=0; j < gridDimension; j++) {
        cellId = 'grid-row-' + i + '-cell-' + j;
        cell = document.createElement('span');
        cell.setAttribute('class', 'grid-cell');
        cell.setAttribute('id', cellId)
        cell.setAttribute('draggable', true)
        rowEl.appendChild(cell);

        var cellEl = document.getElementById(cellId)
        cellEl.onclick = function() {
          var self = this;
          clickToggled(self);
        }

        cellEl.ondrag = function(ev) {
          var hi = '<div class="x-marker">X</div>';
        }

        cellEl.ondragover = function(ev) {
          ev.preventDefault();
        }

        cellEl.ondrop = function(ev) {
          ev.preventDefault();
          var hi = '<div class="x-marker">X</div>';

          if (ev.target.innerHTML !== hi) {
            ev.target.innerHTML = hi;
          }
        }

      }
    }
  }

}

createGrid();
