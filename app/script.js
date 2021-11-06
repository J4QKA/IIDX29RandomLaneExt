// =========== ソート処理系 ===========
// レーン番号ソート
function laneSort(a, b, ascSort){
    var aClass = a.className.split(" ")[1]
    var bClass = b.className.split(" ")[1]
    if(ascSort){
        return Number(aClass) > Number(bClass) ? 1 : -1
    }else{
        return Number(aClass) <= Number(bClass) ? 1 : -1
    }
}
// 昇順
function laneSortAsc(a, b){
    return laneSort(a, b, true)
}
// 降順
function laneSortDesc(a, b){
    return laneSort(a, b, false)
}

// 有効期限ソート
function expirationSort(a, b, ascSort){
    var aClass = a.className.split(" ")[2]
    var bClass = b.className.split(" ")[2]
    if(ascSort){
        return Number(aClass) > Number(bClass) ? 1 : -1
    }else{
        return Number(aClass) <= Number(bClass) ? 1 : -1
    }
}
// 昇順
function expirationSortAsc(a, b){
    return expirationSort(a, b, true)
}
// 降順
function expirationSortDesc(a, b){
    return expirationSort(a, b, false)
}

// ソート状態管理関連を整理
function resetSortState(){
    // Classの削除
    $("#lane-col").removeClass("sort-asc sort-desc")
    $("#expiration-col").removeClass("sort-asc sort-desc")
    // △▽表示の削除
    $("#lane-col > .sort-state").text("")
    $("#expiration-col > .sort-state").text("")
}
// ソート関数を一括設定
function resetSortFunction(){
    $("#lane-col").on("click", clickLaneHeader)
    $("#expiration-col").on("click", clickExpirationHeader)
}

// レーン番号列クリック時
function clickLaneHeader(){
    // リストを取得
    $headerRow = $("#ticket-list > .inner.head").eq(0)
    $ticketRows = $("#ticket-list > .inner:not(.head)")
    $laneHeader = $("#lane-col")
    var $sorted = null

    // 未ソート or 降順ソート時
    if($laneHeader.hasClass("sort-desc")){
        // ソート
        $sorted = $ticketRows.sort(laneSortAsc)
        // ステート管理
        resetSortState()
        $laneHeader.addClass("sort-asc")
        $laneHeader.find(".sort-state")[0].innerText = "▽"
        // デバッグログ
        console.log("レーン番号で昇順ソート")
    }else{
        // ソート
        $sorted = $ticketRows.sort(laneSortDesc)
        // ステート管理
        resetSortState()
        $laneHeader.addClass("sort-desc")
        $laneHeader.find(".sort-state")[0].innerText = "△"
        // デバッグログ
        console.log("レーン番号で降順ソート")
    }

    // リストへ反映
    $("#ticket-list").html($.merge($headerRow, $sorted))
    // ソート関数を再設定
    resetSortFunction()
}

// 有効期限列クリック時
function clickExpirationHeader(){
    // リストを取得
    $headerRow = $("#ticket-list > .inner.head").eq(0)
    $ticketRows = $("#ticket-list > .inner:not(.head)")
    $expirationCol = $("#expiration-col")
    var $sorted = null

    // 未ソート or 降順ソート時
    if($expirationCol.hasClass("sort-desc")){
        // ソート
        $sorted = $ticketRows.sort(expirationSortAsc)
        // ステート管理
        resetSortState()
        $expirationCol.addClass("sort-asc")
        $expirationCol.find(".sort-state")[0].innerText = "▽"
        // デバッグログ
        console.log("有効期限で昇順ソート")
    }else{
        // ソート
        $sorted = $ticketRows.sort(expirationSortDesc)
        // ステート管理
        resetSortState()
        $expirationCol.addClass("sort-desc")
        $expirationCol.find(".sort-state")[0].innerText = "△"
        // デバッグログ
        console.log("有効期限で降順ソート")
    }

    // リストへ反映
    $("#ticket-list").html($.merge($headerRow, $sorted))
    // ソート関数を再設定
    resetSortFunction()
}

// =========== 検索処理系 ===========
// チケット絞り込み
function searchTicket(){
    // 数値検査用
    var numPattern = /[1-7]/
    // 検索条件を生成
    var regexBase = "^"
    $(".lane-search").each(function(){
        var val = $(this).val()
        // 白鍵の場合
        if(val == "W"){
            regexBase += "[1357]"
        // 黒鍵の場合
        }else if(val == "B"){
            regexBase += "[246]"
        // 数字(1-7)の場合
        }else if(val.match(numPattern)){
            regexBase += val
        // それ以外は.と見なす
        }else{
            regexBase += "."
        }
    }) 
    regexBase += "$"
    // 検索用正規表現を生成
    var reObj = new RegExp(regexBase)
    console.log(`${regexBase} で検索実行`)

    // 条件を満たさないものをdisplay:none;に変更
    $("#ticket-list > .inner:not(.head)").each(function(){
        var laneNum = this.className.split(" ")[1]
        // 条件に一致した場合
        if(reObj.test(laneNum)){
            $(this).removeClass("hidden-ticket")
        // 一致しない場合
        }else{
            $(this).addClass("hidden-ticket")
        }
    })
}

// 検索エリアの見た目制御
function redrawSearchInput(){
    $(".lane-search").removeClass("black-key")
    $(".lane-search").each(function(){
        var val = $(this).val()
        if(val.match(/[246B]/)){
            $(this).addClass("black-key")
        }
    })
}

// 検索条件のクリア
function resetCriteria(){
    $(".lane-search").each(function(){
        $(this).val("*")
    })
    redrawSearchInput()
    searchTicket()
    console.log("検索条件をリセット")
}

// 検索条件変更時の処理
function onChangeInput(){
    // 黒鍵が入力された場合の再描画
    redrawSearchInput()
    // 検索処理
    searchTicket()
}

// =========== メイン ===========
$(function(){
    var $laneTickets = $("#ticket-list > .inner:not(.head)")
    // 見た目変更、タグ追加
    $laneTickets.each(function(){
        // レーンの<li>タグを取得
        var $lane = $(this).find("li").eq(0)
        var $date = $(this).find("li").eq(1)
        // <li>タグにclassを追加
        $lane.addClass("lane")

        // レーン表記の見た目を変更
        var laneNum = $lane.get(0).innerText
        var laneHtml = ""
        Array.prototype.forEach.call(laneNum, function(s){
            var num = +s //数値に変換
            laneHtml += `<span class="custom-lane ${num%2==0?'black-key':'white-key'}">${s}</span>`
        })
        $lane.html(laneHtml)

        // 有効期限を数値化
        var expirationDate = $date.get(0).innerText.replace(/\//g, "")

        // 親要素にレーン数値と日付数値のclassを追加
        $lane.parent().addClass(laneNum)
        $lane.parent().addClass(expirationDate)
    })

    // ヘッダーのカスタム
    var $headerRow = $("#ticket-list > .inner.head").eq(0)
    var $laneHeaderumn = $headerRow.find("li").eq(0)
    var $expirationColumn = $headerRow.find("li").eq(1)
    $laneHeaderumn.attr("id", "lane-col")
    $expirationColumn.attr("id", "expiration-col")
    // ソート状態表示用のタグを追加
    $laneHeaderumn.append("<span class='sort-state'></span>")
    $expirationColumn.append("<span class='sort-state'></span>")
    // レーン番号ヘッダークリック時の処理を設定
    resetSortFunction()

    // 検索エリアの追加
    $("#gauge").after("<div id='ticket-search-area'></div>")
    var $ticketSearchArea = $("#ticket-search-area")
    $ticketSearchArea.html("<strong></strong><span></span><div id='search-menu'></div>")
    var $searchMenu = $("#search-menu")
    $searchMenu.html(`
        <p>
        <input type="text" class="lane-search" maxlength="1" value="*"></input>
        <input type="text" class="lane-search" maxlength="1" value="*"></input>
        <input type="text" class="lane-search" maxlength="1" value="*"></input>
        <input type="text" class="lane-search" maxlength="1" value="*"></input>
        <input type="text" class="lane-search" maxlength="1" value="*"></input>
        <input type="text" class="lane-search" maxlength="1" value="*"></input>
        <input type="text" class="lane-search" maxlength="1" value="*"></input>
        </p>
        <a href="#!" id="search-clear-btn">クリア</a>
    `)

    // 検索処理を設定
    $(".lane-search").change(onChangeInput)
    // 検索条件クリア処理を設定
    $("#search-clear-btn").on("click", resetCriteria)
})