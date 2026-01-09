$(document).ready(function() {
    function getTodoCount() {
        return $('.todo-list .todo-item').length;
    }
    function updateInputState() {
        if(getTodoCount() >= 10) {
            $('.todo-input').prop('disabled', true);
            $('.add-btn').prop('disabled', true);
        } else {
            $('.todo-input').prop('disabled', false);
            $('.add-btn').prop('disabled', false);
        }
    }
    // 할 일 추가
    $(document).on('click', '.add-btn', function() {
        var value = $('.todo-input').val().trim();
        if(value && getTodoCount() < 10) {
            var newItem = $('<li class="todo-item">'
                + '<label>'
                + '<input type="checkbox" class="done-chk">'
                + '<span class="todo-text">'+ $('<div>').text(value).html() +'</span>'
                + '</label>'
                + '<button class="delete-btn" title="삭제"><span class="icon-del">&#8722;</span></button>'
                + '</li>');
            $('.todo-list').append(newItem);
            $('.todo-input').val('');
        }
        updateInputState();
    });
    // 엔터로 추가
    $(document).on('keydown', '.todo-input', function(e) {
        if(e.key === 'Enter') {
            $('.add-btn').click();
        }
    });
    // 삭제
    $(document).on('click', '.delete-btn', function() {
        $(this).closest('.todo-item').remove();
        updateInputState();
    });
    // 체크박스 완료 처리
    $(document).on('change', '.done-chk', function() {
        $(this).siblings('.todo-text').toggleClass('done', $(this).is(':checked'));
    });
    // 할 일 더블클릭 시 수정
    $(document).on('dblclick', '.todo-text', function() {
        var $text = $(this);
        var $li = $text.closest('.todo-item');
        if($li.find('.edit-input').length) return;
        var origin = $text.text();
        var $input = $('<input type="text" class="edit-input">').val(origin);
        $text.hide();
        $li.find('label').append($input);
        $input.focus().on('keydown', function(e) {
            if(e.key === 'Enter') {
                finishEdit();
            } else if(e.key === 'Escape') {
                cancelEdit();
            }
        });
        $input.on('blur', finishEdit);
        function finishEdit() {
            var updated = $input.val().trim();
            if(updated) {
                $text.text(updated);
            }
            $text.show();
            $input.remove();
        }
        function cancelEdit() {
            $text.show();
            $input.remove();
        }
    });
    updateInputState();
});